export function logPageLoadMessage() {
    console.log("JavaScript is being loaded!");
} 

// Ensure this function runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', logPageLoadMessage);

document.getElementById('chatPostForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behaviour

    // Create headers for authentication
    const myHeaders = new Headers();
    myHeaders.append("student_number", "s4872328");
    myHeaders.append("uqcloud_zone_id", "918f203d");

    // Get the form element
    const form = document.getElementById('chatPostForm');

    // Create FormData from the form
    const formData = new FormData(form);

    // Prepare the fetch request options
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData, // Pass the serialized form data
        redirect: "follow"
    };

    // Send the POST request
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericchat", requestOptions)
        .then(response => response.json()) // Convert response to JSON
        .then(result => {
            console.log(result); // Log the result to the console
            handleSuccess(result); // Call the success handler with the result
        })
        .catch(error => handleError(error)); // handle any errors that occur
});

// Form Submit Success handler
function handleSuccess(result) {
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = `Thanks! Your post has been submitted!`; // Adjust the message based on the result
    messageDiv.style.color = "green";
    // Reset the form after success
    document.getElementById('chatPostForm').reset(); // Make sure this references the correct form ID
}

// Form Submit Error handler
function handleError(error) {
    console.error("Error:", error); // for debugging
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = "There was a problem. Please try again.";
    messageDiv.style.color = "red";
}


function fetchEvents(studentNumber, zoneld, displayEvents, handleGETError) {

    // Request options for the GET request
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    // Fetch data from the Generic Event API
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/", requestOptions)
        .then(response => response.json()) // Parse the JSON response
            .then(data => {
            console.log(data); // Log the data to the console for debugging

        let output = ""; // Initialize a variable to store HTML

        // Loop through each event in the response data
        data.forEach(event => {
            // Use the returned event information to build a webpage element
            output += `
                <div class="event-card">
                    <h3>${event.event_name}</h3>
                    <p>Date: ${event.date_time}</p>
                    <p>Description: ${event.description}</p>
                    <p>Location: ${event.location}</p>
                </div>
            `;
        });

        // Display the dynamically created HTML in the specified section of the webpage
        document.getElementById('event-list').innerHTML = output; // Ensure you have an element with ID 'event-list'
    })
    .catch(error => console.error('Error:', error)); // Handle any errors that occur




// Function to fetch events from the API
function fetchEvents(studentNumber, zoneld, displayEvents, handleGETError) {
    // Request options for the GET request
    const requestOptions = {
        method: "GET",
        headers: myHeaders, // Use the predefined headers
        redirect: "follow"
    };

    // Fetch data from the Generic Event API
    fetch("https://api.igdb.com/v4/events", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            displayEvents(data); // Call the success handler
        })
        .catch(error => {
            handleGETError(error); // Call the error handler
        });
}}

