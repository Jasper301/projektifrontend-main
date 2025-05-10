/* eslint-disable require-jsdoc */
import {fetchData} from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form'); // Select the login form

  if (loginForm) {
    loginForm.addEventListener('submit', async (evt) => {
      evt.preventDefault(); // Prevent the default form submission

      console.log('Logging in now');

      const url = 'http://localhost:3000/api/auth/login';

      const formData = new FormData(loginForm); // Get form data
      console.log('formdata', formData);
      const data = {
        username: formData.get('username'), // Get username from form data
        password: formData.get('password'), // Get password from form data

      };
      console.log(data);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetchData(url, options)
          .then((data) => {
            console.log('data', data);
            console.log('token', data.token);
            localStorage.setItem('token', data.token);
            if (data.token === undefined) {
              alert('Unauthorized user: Incorrect username or password');
            } else {
              alert(data.message);
              localStorage.setItem('name', data.user.username);
              window.location.href = 'login.html';
            }

            // eslint-disable-next-line max-len
            logResponse('loginResponse', `localStorage set with token value: ${data.token}`);
          })
          .catch((error) => { 
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
          });
    });
  }

  const meRequest = document.querySelector('#meRequest');
  if (meRequest) {
    meRequest.addEventListener('click', async () => {
      console.log('Testing TOKEN and fetching user data');

      const url = 'http://localhost:3000/api/auth/me';
      const muntokeni = localStorage.getItem('token');
      console.log('Retrieved from LocalStorage:', muntokeni);

      const options = {
        method: 'GET',
        headers: {
          // eslint-disable-next-line max-len
          Authorization: 'Bearer ' + muntokeni, // Correctly format the Authorization header
        },
      };

      console.log(options);

      fetchData(url, options)
          .then((data) => {
            console.log(data);
            // eslint-disable-next-line max-len
            logResponse('meResponse', `Authorized user info: ${JSON.stringify(data)}`);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            // eslint-disable-next-line max-len
            alert('An error occurred while fetching user data. Please try again later.');
          });
    });
  }

  const clearButton = document.querySelector('#clearButton');
  if (clearButton) {
    clearButton.addEventListener('click', clearLocalStorage);
  }
});

function logResponse(codeblock, text) {
  const element = document.getElementById(codeblock);
  if (element) {
    element.innerText = text;
  }
}

function clearLocalStorage() {
  localStorage.removeItem('token');
  logResponse('clearResponse', 'localStorage cleared!');
}
