import { fetchData } from './fetch.js'; // Oletan että fetchData on omassa tiedostossaan

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    console.log("näytä");

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Tarkistetaan, että kentät eivät ole tyhjiä
    if (!usernameInput.value || !emailInput.value || !passwordInput.value) {
      alert('Fill in all input fields before registering.');
      return;
    }

    const url = 'http://localhost:3000/api/users';
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
    };

    console.log("data", data);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const responseData = await fetchData(url, options);

      // Tarkistetaan, että palvelin palautti virhettä
      if (responseData.error) {
        alert(`Registration failed: ${responseData.message}`);
        return;
      }

      console.log(responseData);
      // Ohjataan käyttäjä toiseen sivuun onnistuneen rekisteröinnin jälkeen
      window.location.href = 'index.html'; // Säädä URL tarvittaessa
    } catch (error) {
      console.error('Error:', error.message);
      alert('An unexpected error occurred during registration.');
    }
  });
});
