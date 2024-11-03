import {logPageLoadMessage, chatPostForm, studentNumber, uqcloudZoneId, myHeaders} from './components.js'



// Form Submit Success handler
function handleSuccess(result) {
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = `Thanks! ${result.submitResponse} was posted!`;
    messageDiv.style.color = "green";
    // Reset the form after success
    document.getElementById('eventForm').reset();
}

// Form Submit Error handler
function handleError(error) {
    console.log(error); // for debugging
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = "There was a problem. Please try again.";
    messageDiv.style.color = "red";
}

// Select the form and listen for the submit event
document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Create a new FormData object to hold the form data
    const formData = new FormData(event.target);

    // Get the date and time from the form and reformat it
    const dateTimeInput = document.getElementById("date_time").value;

    // Manually extract year, month, day, hour, minute to ensure consistency
    const date = new Date(dateTimeInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const hours = String(date.getHours()).padStart(2, '0'); // Ensure two digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits

    // Format the date to "YYYY-MM-DD HH:MM" (removing seconds and timezone)
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    // Append the formatted date to the FormData
    formData.set('date_time', formattedDateTime);

    // Call the submitEventForm function and pass in the handlers
    submitchatPostForm(formData, myHeaders, handleSuccess, handleError);
});





// // Form Submit Success handler
// function handleSuccess(result) {
//     const messageDiv = document.getElementById('submitResponse');
//     messageDiv.textContent = `Thanks! ${result.event_name} was posted!`;
//     messageDiv.style.color = "green";

//     // Reset the form after success
//     document.getElementById('eventForm').reset();
//     loadEvents();
// }

// // Form Submit Error handler
// function handleError(error) {
//     console.log(error); // for debugging
//     const messageDiv = document.getElementById('submitResponse');
//     messageDiv.textContent = "There was a problem. Please try again.";
//     messageDiv.style.color = "red";
// }

// //Select the form and listen for the submit chat
// document.getElementById('submitEventForm').addEventListener('submit', function(event){
//     event.preventDefault(); //

//     // Create a new FormData object to hold the form data
//     const formData = new FormData(event.target);
 
//     //Get the date from the form and reformat it (POST)
//     const dateTimeInput = document.getElementById('event_date_time').value; 
 
//     // Manually extract year, month, day, hour, minute to ensure consistency
//     const date = new Date(dateTimeInput);
 
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
 
//     // Format the date to DD-MM-YYYY HH:MM
//     const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
 
//     // Append the formatted date to the FormData
//     formData.set('event_date_time', formattedDateTime);
 
//     // Call the submitchatPostForm function and pass in the handlers
//     submitEventForm(formData, myHeaders, handleSuccess, handleError);
// });

// function formatDateTime(isoString) {
//     // Create a new Date object from the ISO string
//     const date = new Date(isoString);
    
//     // Format the date: "26 September, 2024"
//     const formattedDate = date.toLocaleDateString('en-GB', {
//         day: 'numeric', 
//         month: 'long', 
//         year: 'numeric'
//     });

//     // Format the time: "6:30 AM"
//     const formattedTime = date.toLocaleTimeString('en-US', {
//         hour: 'numeric', 
//         minute: 'numeric',
//         hour12: true // For AM/PM format
//     });

//     return `${formattedDate} at ${formattedTime}`;
// }

// // Error handler function
// function handleGETError(error) {
//     console.error('Error fetching events:', error);
//     document.getElementById('events-container').innerHTML = '<p>Failed to load events. Please try again later.</p>';
// }

// // Success handler function to display events
// function displayEvents(data) {
//     let output = ""; // Initialize a variable to store HTML

//     // Loop through each event in the response data
//     data.forEach(event => {
//         console.log(event); // for debugging

//         // Format the date and time using the custom function
//         const formattedDateTime = formatDateTime(event.date_time);

//         // Check if the event has an image; otherwise, use the placeholder
//         const eventImage = event.genericevent_photo ? event.genericevent_photo : "images/api.png"; // Use placeholder if no image

//         output += `
//             <div class="event-card" role="article" aria-labelledby="event-${event.id}-name">
//                 <div class="event-card-header">
//                     <h3 class="event-name" id="event-${event.id}-name">${event.event_name}</h3>
//                     <p class="event-date">${formattedDateTime}</p>
//                 </div>
//                 <div class="event-card-image">
//                     <img src="${eventImage}" alt="${event.event_name}">
//                 </div>
//                 <div class="event-card-body">
//                     <p class="event-description">${event.description}</p>
//                     <p class="event-location">Location: ${event.location}</p>
//                 </div>
//                 <div class="event-card-footer">
//                     <p class="event-organiser">Organised by: ${event.organiser}</p>
//                 </div>
//             </div>
//         `;
//     });

//     // Display the dynamically created HTML in the specified section of the webpage
//     document.getElementById('events-container').innerHTML = output;
// }

// // Function to load events (call this on page load and after form submission)
// function loadEvents() {
//     fetchEvents(studentNumber, uqcloudZoneId, displayEvents, handleGETError);
// }

// // Call loadEvents when the page loads
// document.addEventListener('DOMContentLoaded', function() {
//     loadEvents(); // Load events when the DOM is fully loaded
// });

// logPageLoadMessage();