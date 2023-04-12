<script>
  import { onMount } from 'svelte';

  let now = new Date();

  // Start the day at 9:00, the start is before the lunch
  let startTime = 540;
  $: startTime = Math.min(lunchTime, startTime);

  // End the day at 17:00
  let endTime = 1020;

  // Start the lunch at 12:00, the lunch is before the end of the lunch
  let lunchTime = 720;
  $: lunchTime = Math.min(lunchEndTime, lunchTime);

  // End the lunch at 13:00, the end of the lunch
  let lunchEndTime = 780;
  $: lunchEndTime = Math.min(endTime, lunchEndTime);
  
  // Convert minutes to date
  const minutesToDate = (minutes) => {
    const date = new Date();
    date.setHours(0, minutes, 0, 0);
    return date;
  }

  // Calculate the time left in a day in minutes
  const calculateTimeLeft = (now, startTime, endTime, lunchTime, lunchEndTime) => {
    const start = minutesToDate(startTime);
    const end = minutesToDate(endTime);
    const lunch = minutesToDate(lunchTime);
    const lunchEnd = minutesToDate(lunchEndTime);
    const lunchDuration = lunchEnd - lunch;
    let timeLeft = 0;

    // If the day has not started yet
    if (now < start) {
      timeLeft = end - start - lunchDuration;
    // It the day has started but the lunch has not started yet
    } else if (now >= start && now < lunch) {
      timeLeft = end - now - lunchDuration;
    // If the lunch has started but the lunch has not ended yet
    } else if (now >= lunch && now < lunchEnd) {
      timeLeft = end - lunchEnd;
    // If the lunch has ended but the day has not ended yet
    } else if (now >= lunchEnd && now < end) {
      timeLeft = end - now;
    }
    return Math.round(timeLeft / 60000);
  }

  // Calculate the time left until the end of the day in minutes
  $: timeLeft = calculateTimeLeft(now, startTime, endTime, lunchTime, lunchEndTime);

  // Calculate the total time per day
  $: totalTime = minutesToDate(endTime - startTime - (lunchEndTime - lunchTime))

  onMount(() => {
    // Create a timer that updates every second
    let timer = setInterval(() => {
      // Update the time
      now = new Date();
    }, 1000);
    
    // Remove the timer when the component is destroyed
    return () => clearInterval(timer);
  })
</script>

<svelte:head>
  <title>How much time left today?</title>
</svelte:head>

<div class="container">
  <h1 class="text-center">How much time left today?</h1>

  <div class="input-group mb-3">
    <span class="input-group-text" id="start-time">Start time: {minutesToDate(startTime).toTimeString().substring(0, 5)}</span>
    <input type="range" class="form-range" aria-describedby="start-time" min=0 max=1440 bind:value={startTime}>
  </div>
  
  <div class="input-group mb-3">
    <span class="input-group-text" id="end-time">End time: {minutesToDate(endTime).toTimeString().substring(0, 5)}</span>
    <input type="range" class="form-range" aria-describedby="end-time" min=0 max=1440 bind:value={endTime}>
  </div>
  
  <div class="input-group mb-3">
    <span class="input-group-text" id="lunch-time">Lunch time: {minutesToDate(lunchTime).toTimeString().substring(0, 5)}</span>
    <input type="range" class="form-range" aria-describedby="lunch-time" min=0 max=1440 bind:value={lunchTime}>
  </div>
  
  <div class="input-group mb-3">
    <span class="input-group-text" id="lunch-end-time">Lunch end time: {minutesToDate(lunchEndTime).toTimeString().substring(0, 5)}</span>
    <input type="range" class="form-range" aria-describedby="lunch-end-time" min=0 max=1440 bind:value={lunchEndTime}>
  </div>
  
  <div class="text-center">
    <p>Time today: {totalTime.getHours()} hours {totalTime.getMinutes()} minutes</p>
    <p>Now: {now.toTimeString().substring(0, 8)}</p>
    <p>Time left today: {timeLeft} minutes</p>
  </div>
</div>