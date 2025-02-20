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

window.addShow = async function(event) {
    event.preventDefault();

    const title = document.getElementById("show-title").value;
    const author = document.getElementById("show-author").value;
    const director = document.getElementById("show-director").value;
    const genre = document.getElementById("show-genre").value;
    const year = document.getElementById("show-year").value;
    const description = document.getElementById("show-description").value;

    try {
        await addDoc(collection(db, "shows"), {
            title: title,
            author: author,
            director: director,
            genre: genre,
            year: year,
            description: description,
            createdAt: new Date() // Add timestamp
        });
        document.getElementById("show-form").reset();
        displayShows(); // Refresh the show list after adding a new show
    } catch (error) {
        console.error("Error adding show: ", error);
        alert("Error adding show. Please try again.");
    }
};

async function displayShows() {
    const querySnapshot = await getDocs(collection(db, "shows"));
    const shows = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Convert to array of objects
    shows.sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt (newest first)

    const tableBody = document.querySelector("#show-table tbody");
    tableBody.innerHTML = ""; // Clear the table before adding new data

    shows.forEach(show => { // Use the sorted shows array
        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const authorCell = row.insertCell(1);
        const directorCell = row.insertCell(2);
        const genreCell = row.insertCell(3);
        const yearCell = row.insertCell(4);
        const descriptionCell = row.insertCell(5);
        const linkCell = row.insertCell(6);

        const link = document.createElement("a");
        link.href = `entries/show-detail.html?id=${show.id}`; // Use show.id from the sorted array
        link.textContent = "Edit";
        linkCell.appendChild(link);
        titleCell.textContent = show.title;
        authorCell.textContent = show.author;
        directorCell.textContent = show.director;
        genreCell.textContent = show.genre;
        yearCell.textContent = show.year;
        descriptionCell.textContent = show.description;
    });
}

displayShows();