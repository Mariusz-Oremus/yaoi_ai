import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDeQiMJRp_Yg-WdT6hF1aQsDfg45rxn9uc",
  authDomain: "yaoi-ai-2f819.firebaseapp.com",
  projectId: "yaoi-ai-2f819",
  storageBucket: "yaoi-ai-2f819.firebasestorage.app",
  messagingSenderId: "296158977150",
  appId: "1:296158977150:web:461f7576296897776c4c2f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Add Film to Firestore
async function addFilm(event) {
    event.preventDefault();  // Prevent form from reloading the page

    // Get data from form fields
    const title = document.getElementById("film-title").value;
    const author = document.getElementById("film-author").value;
    const director = document.getElementById("film-director").value;
    const genre = document.getElementById("film-genre").value;
    const year = document.getElementById("film-year").value;
    const description = document.getElementById("film-description").value;

    // Log data to console to check
    console.log("Film Data Submitted:", {
        title, author, director, genre, year, description
    });

    // Save data to Firebase Firestore
    try {
        await db.collection("films").add({
            title: title,
            author: author,
            director: director,
            genre: genre,
            year: year,
            description: description
        });
        alert("Film added successfully!");
        document.getElementById("film-form").reset();
    } catch (error) {
        console.error("Error adding film: ", error);
        alert("Error adding film. Please try again.");
    }
}
