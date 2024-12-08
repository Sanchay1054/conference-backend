document.getElementById('submitbutton').addEventListener('click', function () {
    const form = document.getElementById('myForm');
    
    // Get form data
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value; // Convert FormData to a regular object
    });
  
    // API URL
    const apiUrl = 'http://localhost:3000/api/register';
  
    // Send data to the API
    fetch(apiUrl, {
      method: 'POST', // Use POST for sending data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject), // Send data as JSON
    })
      .then(response => {
        if (!response.ok) {
            alert('Form submission error. Contact admin!');
        }
        alert('Form submitted successfully!');
        return response.json(); // Parse JSON response
      })
  });
  