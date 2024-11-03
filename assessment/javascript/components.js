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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Convert response to JSON
        })
        .then(result => {
            console.log(result); // Log the result to the console
            handleSuccess(result); // Call the success handler with the result
            fetchChatPosts(); // Refresh the chat list after a successful post
        })
        .catch(error => {
            console.error("Error:", error); // handle any errors that occur
            handleError(error);
        });
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

// Set up the headers for student authentication
function fetchChatPosts(){
    const myHeaders = new Headers();
    myHeaders.append("student_number", "s4872328"); // Replace with actual student number
    myHeaders.append("uqcloud_zone_id", "918f203d"); // Replace with actual zone ID

    // Request options for the GET request
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    // Fetch data from the Generic Chat API
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericchat", requestOptions)
        .then(response => {
            // Check if the response is OK and in JSON format
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Attempt to parse JSON
        })
        .then(data => {
            console.log(data);

            // Example: Dynamically display the product data on a webpage
            let output = ""; 

            data.forEach(chatPost => {
                output += `
                    <div class="chat-post">
                        <h3>${chatPost.person_name}</h3>
                        <h4>${chatPost.chat_post_title}</h4>
                        <p>${chatPost.chat_post_content}</p>
                        <span>${chatPost.chat_date_time}</span>
                    </div>
                `;
            });

            document.getElementById("chat-list").innerHTML = output;
        })
        .catch(error => {
            console.error("Error:", error); 
            // Display a user-friendly message or handle the error as needed
        });
}

document.addEventListener('DOMContentLoaded', fetchChatPosts);



