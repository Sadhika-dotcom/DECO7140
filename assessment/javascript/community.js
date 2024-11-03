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