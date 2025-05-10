// Funktion alustus createTable:n määrittämiseksi
function createTable(data) {
    console.log(data);

    // Etsitään tbody elementti
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    // Loopissa luodaan jokaiselle tietoriville oikeat elementit
    data.forEach((exercise) => {
        // Luodaan TR elementti kullekin käyttäjälle
        const tr = document.createElement('tr');

        // Luodaan solut käyttäjätiedoille
        const td1 = document.createElement('td');
        td1.innerText = exercise.user_id

        const td2 = document.createElement('td');
        td2.innerText = exercise.name;

        // Lisätään käyttäjätiedot taulukkoon
        tr.appendChild(td1);
        tr.appendChild(td2);

        // Jos käyttäjällä on treenejä, lisätään ne taulukkoon
        if (exercise) {
            const tdReps = document.createElement('td');
            tdReps.innerText = exercise.reps;
            tr.appendChild(tdReps);

            const tdWeight = document.createElement('td');
            tdWeight.innerText = exercise.weight;
            tr.appendChild(tdWeight);
        } else {
            // Jos käyttäjällä ei ole treenejä, näytetään "Ei treenejä" -teksti
            const td3 = document.createElement('td');
            td3.innerText = 'Ei treenejä';
            tr.appendChild(td3);
        }

        // Lisätään rivi taulukkoon
        tbody.appendChild(tr);
    });
}

// Funktion alustus fetchData:n määrittämiseksi
async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json();
}

// Funktion alustus getUsers:n määrittämiseksi
async function getUsers() {
    console.log('Haetaan kaikki käyttäjät ja heidän viimeiset 10 treeniään');
    const url = 'http://127.0.0.1:3000/api/entries';
    let token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer: ' + token,
        },
    };

    fetchData(url, options).then((exercises) => {
        const data = exercises.map((exercise) => ({
            user_id: exercise.uid,
            name: exercise.NAME,
            reps: exercise.REPS,
            weight: exercise.Weight,
        }));
        const lastTenExercises = data.slice(0, 10);
        createTable(lastTenExercises);
    });
}
$(document).ready(function () {
    // Function to handle logout
    function logout() {
      // Tässä voit toteuttaa kirjautumisen ulos
      // Esimerkiksi lähettämällä pyynnön palvelimelle kirjautumisen ulos käsittelemiseksi
      // tai poistamalla paikallisesti tallennetut kirjautumistiedot
      alert("Kirjauduttu ulos"); // Esimerkki ilmoitus
      // Voit ohjata käyttäjän esimerkiksi kirjautumissivulle
      // window.location.href = "kirjautumissivu.html";
    }
  
    // Lisää tapahtumankäsittelijä napille
    $("#logoutButton").click(function () {
      logout();
      window.location.href = 'index.html';
    });
  });
// Lisätään tapahtumankäsittelijä napille
document.getElementById('fetchDataBtn').addEventListener('click', getUsers);

 