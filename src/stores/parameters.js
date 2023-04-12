import { writable } from 'svelte/store';

// Start the day at 9:00 AM or the stored value
const startTime = writable(localStorage.getItem("startTime") || 540);
startTime.subscribe((value) => localStorage.setItem('startTime', value))

// End the day at 5:00 PM or the stored value
const endTime = writable(localStorage.getItem("endTime") || 1020);
endTime.subscribe((value) => localStorage.setItem('endTime', value))

// Lunch starts at 12:00 PM or the stored value
const lunchTime = writable(localStorage.getItem("lunchTime") || 720);
lunchTime.subscribe((value) => localStorage.setItem('lunchTime', value))

// Lunch ends at 1:00 PM or the stored value
const lunchEndTime = writable(localStorage.getItem("lunchEndTime") || 780);
lunchEndTime.subscribe((value) => localStorage.setItem('lunchEndTime', value))

export {
  startTime,
  endTime,
  lunchTime,
  lunchEndTime,
}