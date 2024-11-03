function logPageLoadMessage() {
    console.log("Javascript is being loaded!");
}



// Constants
const studentNumber = "s4872328" ;
const uqcloudZoneId = "918f203d";


// Create headers once as a constant
const myHeaders = new Headers();
myHeaders.append ("student_number", "s4872328"); 
myHeaders.append ("uqcloud_zone_id", "918f203d");

// Fetch request function for creating a new event
function submitEventForm(formData, myHeaders, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: "follow"
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                console.error('Server error response:', err); // Log server error for debugging
                throw new Error(err.detail || 'Something went wrong'); // Throw an error if not okay
            });
        }
        return response.json(); // If success, return the response as JSON
    })
    .then(result => {
        console.log('Event created:', result);
        handleSuccess(result); // Call the success handler
    })
    .catch(error => {
        console.error('Error:', error.message); // Log detailed error
        handleError(error); // Call the error handler
    });
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

// Export headers so that other files can use it
export {logPageLoadMessage, submitEventForm, studentNumber, uqcloudZoneId, fetchEvents, myHeaders};
