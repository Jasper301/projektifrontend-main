import { fetchData } from './fetch.js';

$(document).ready(function () {
    // Function to add new input fields
    $("#rowAdder").click(function () {
        const newRow = '<div class="row">' +
            '<div class="col-lg-12">' +
            '<div class="input-group m-3">' +
            '<div class="input-group-prepend">' +
            '<button class="btn btn-danger delete-row" type="button">' +
            '<i class="bi bi-trash"></i> Delete' +
            '</button>' +
            '</div>' +
            '<input type="text" class="form-control m-input exerciseInput" placeholder="Exercise">' +
            '<input type="text" class="form-control m-input setsRepsInput" placeholder="Sets and Reps">' +
            '<input type="text" class="form-control m-input weightInput" placeholder="Weight">' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#newInputsContainer').append(newRow);
    });

    // Function to delete a row
    $("body").on("click", ".delete-row", function () {
        $(this).closest(".row").remove();
    });

    // Form submission validation
    $("form").submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Exercise validation
        $(".exerciseInput").each(function () {
            var exerciseValue = $(this).val().trim();
            var regex = /^[a-zA-Z]+$/; // Regular expression for alphabetic characters

            if (!regex.test(exerciseValue)) {
                alert("Please enter Exercise using only alphabetic characters.");
                isValid = false; // Set validation flag to false
                return false; // Stop further processing
            }
        });

        // Sets and Reps validation
        $(".setsRepsInput").each(function () {
            var setsRepsValue = $(this).val().trim();
            var regex = /^\d+x\d+$/; // Regular expression for "Sets and Reps" format (e.g., 3x10)

            if (!regex.test(setsRepsValue)) {
                alert("Please enter Sets and Reps in the correct format, e.g., '3x10'");
                isValid = false; // Set validation flag to false
                return false; // Stop further processing
            }
        });

        // Weight validation
        $(".weightInput").each(function () {
            var weightValue = $(this).val().trim();
            var regex = /^\d+$/; // Regular expression for numeric characters

            if (!regex.test(weightValue)) {
                alert("Please enter Weight using only numeric characters.");
                isValid = false; // Set validation flag to false
                return false; // Stop further processing
            }
        });

        if (isValid) {
            getUsers();
        }
    });

    // Logout button click event handler
    $("#logoutButton").click(function () {
        logout();
    });
});

// Function to handle logout
function logout() {
    alert("Logged out"); // Example alert
    window.location.href = 'index.html'; // Redirect to login page
}

async function getUsers() {
    console.log('Submitting form data');
    const url = 'http://fisuversio2.swedencentral.cloudapp.azure.com/api/entries';
    let token = localStorage.getItem('token');

    // Retrieve values from form fields
    let exerciseName = $('.exerciseInput').last().val().trim(); // Get the last exercise input value
    let setsReps = $('.setsRepsInput').last().val().trim(); // Get the last sets and reps input value
    let weight = $('.weightInput').last().val().trim(); // Get the last weight input value

    // Split sets and reps value
    let [sets, reps] = setsReps.split('x');

    let data = {
        "name": exerciseName,
        "sets": sets.trim(), // Remove whitespace
        "reps": reps.trim(), // Remove whitespace
        "weight": weight
    };

    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetchData(url, options);
        console.log('Response:', response);
        // Handle success response
        alert('Data submitted successfully!');
    } catch (error) {
        console.error('Error:', error);
        // Handle error response
        alert('An error occurred while submitting the data.');
    }
}
