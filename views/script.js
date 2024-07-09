document.addEventListener('DOMContentLoaded', function() {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
        document.getElementById('firstName').value = savedFormData.firstName;
        document.getElementById('lastName').value = savedFormData.lastName;
        document.getElementById('phone').value = savedFormData.phone;
        document.getElementById('email').value = savedFormData.email;

        document.getElementById('job-type').value = savedFormData.jobType;
        document.getElementById('job-sources').value = savedFormData.jobSource;
        document.getElementById('job-descr').value = savedFormData.jobDescr;

        document.getElementById('address').value = savedFormData.address;
        document.getElementById('city').value = savedFormData.city;
        document.getElementById('state').value = savedFormData.state;
        document.getElementById('zip-code').value = savedFormData.zipCode;
        document.getElementById('area').value = savedFormData.area;

        document.getElementById('start-date').value = savedFormData.startDate;
        document.getElementById('start-time').value = savedFormData.startTime;
        document.getElementById('end-time').value = savedFormData.endTime;
        document.getElementById('test').value = savedFormData.test;
    }
});

const form = document.querySelector('.form');
const submitButton = document.getElementById('submit');
const saveButton = document.getElementById('save');

function saveFormData() {
    const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            jobType: document.getElementById('job-type').value,
            jobSource: document.getElementById('job-sources').value,
            jobDescr: document.getElementById('job-descr').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zip-code').value,
            area: document.getElementById('area').value,
            startDate: document.getElementById('start-date').value,
            startTime: document.getElementById('start-time').value,
            endTime: document.getElementById('end-time').value,
            test: document.getElementById('test').value
    };

    console.log(formData);
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Form data saved to localStorage!');
}

function createDeal(event) {
    event.preventDefault(); 

    const form = document.querySelector('.form');

    // Create the formData object with the correct structure:
    const formData = {
        firstName: form["firstName"].value,
        lastName: form["lastName"].value,
        phone: form["phone"].value,
        email: form["email"].value,
        jobType: form["jobType"].value,
        jobSource: form["jobSource"].value,
        jobDescr: form["jobDescr"].value,
        address: form["address"].value,
        city: form["city"].value,
        state: form["state"].value,
        zipCode: form["zipCode"].value,
        area: form["area"].value,
        startDate: form["startDate"].value,
        startTime: form["startTime"].value,
        endTime: form["endTime"].value,
        test: form["test"].value,
    };

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) { // Check for HTTP errors (status outside 200-299)
            throw new Error('Network response was not ok');
        }
        return response.text(); // Parse the response body as text
    })
    .then(data => {
        // Successful submission
        alert("Form Submitted"); // Display the server's success message
        form.reset(); // Clear the form
    })
    .catch(error => {
        // Handle network errors or non-ok responses here
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again later.'); 
    });
}



saveButton.addEventListener('click', saveFormData);
submitButton.addEventListener('click', createDeal);