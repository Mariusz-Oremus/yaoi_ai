import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDeQiMJRp_Yg-WdT6hF1aQsDfg45rxn9uc",
    authDomain: "yaoi-ai-2f819.firebaseapp.com",
    projectId: "yaoi-ai-2f819",
    storageBucket: "yaoi-ai-2f819.firebasestorage.app",
    messagingSenderId: "296158977150",
    appId: "1:296158977150:web:461f7576296897776c4c2f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addFilm = async function(event) {
    event.preventDefault();

    const title = document.getElementById("film-title").value;
    const author = document.getElementById("film-author").value;
    const director = document.getElementById("film-director").value;
    const genre = document.getElementById("film-genre").value;
    const year = document.getElementById("film-year").value;
    const description = document.getElementById("film-description").value;

    try {
        await addDoc(collection(db, "films"), {
            title: title,
            author: author,
            director: director,
            genre: genre,
            year: year,
            description: description
        });
        document.getElementById("film-form").reset();
        displayFilms(); // Refresh the film list after adding a new film
    } catch (error) {
        console.error("Error adding film: ", error);
        alert("Error adding film. Please try again.");
    }
};

async function displayFilms() {
    const querySnapshot = await getDocs(collection(db, "films"));
    const tableBody = document.querySelector("#film-table tbody");
    tableBody.innerHTML = ""; // Clear the table before adding new data

    querySnapshot.forEach((doc) => {
        const film = doc.data();
        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const authorCell = row.insertCell(1);
        const directorCell = row.insertCell(2);
        const genreCell = row.insertCell(3);
        const yearCell = row.insertCell(4);
        const descriptionCell = row.insertCell(5);

        titleCell.textContent = film.title;
        authorCell.textContent = film.author;
        directorCell.textContent = film.director;
        genreCell.textContent = film.genre;
        yearCell.textContent = film.year;
        descriptionCell.textContent = film.description;
    });
}

displayFilms();