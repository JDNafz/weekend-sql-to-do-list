function timeCalc(){
// Create a new Date object to get the current date and time
const currentTime = new Date();

// Get the current hours and minutes
const currentHours = currentTime.getHours();
const currentMinutes = currentTime.getMinutes();

// Display the current time in hours and minutes
console.log(`Current time: ${currentHours}:${currentMinutes}`);

const timeInMinutes = currentHours * 60 + currentMinutes;
console.log("time in minutes", timeInMinutes)

// Get back to time:
// const mins = timeInMinutes % 60
// const hours = (timeInMinutes - mins) / 60
// console.log("mins:", hours, mins)
    return timeInMinutes
}


module.exports = timeCalc;