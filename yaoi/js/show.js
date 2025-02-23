import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

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

// Supabase Setup
const SUPABASE_URL = 'https://pdfcypahbimfivzhxnmg.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkZmN5cGFoYmltZml2emh4bm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNDA0ODEsImV4cCI6MjA1NTkxNjQ4MX0.OxvlL7J3rqPh5lI0e9YtYj-eN8oZG2UmOeocB2dpsQQ'; // Replace with your Supabase anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addShow = async function(event) {
    event.preventDefault();

    const title = document.getElementById("show-title").value;
    const author = document.getElementById("show-author").value;
    const director = document.getElementById("show-director").value;
    const genre = document.getElementById("show-genre").value;
    const year = document.getElementById("show-year").value;
    const description = document.getElementById("show-description").value;

    const imageInput = document.getElementById("show-image");
    const imageFile = imageInput.files[0];
    let imageUrl = "";

    if (imageFile) {
        const { data, error } = await supabase.storage
            .from('yaoi-img') // Replace with your Supabase bucket name
            .upload(imageFile.name, imageFile);

        if (error) {
            console.error("Error uploading image to Supabase: ", error);
            alert("Error uploading image. Please try again.");
            return;
        }

        imageUrl = supabase.storage.from('yaoi-img').getPublicUrl(imageFile.name).data.publicUrl;
    }

    try {
        await addDoc(collection(db, "shows"), {
            title: title,
            author: author,
            director: director,
            genre: genre,
            year: year,
            description: description,
            image: imageUrl, // Store the Supabase image URL
            createdAt: new Date()
        });
        document.getElementById("show-form").reset();
        displayShows();
    } catch (error) {
        console.error("Error adding show: ", error);
        alert("Error adding show. Please try again.");
    }
};

async function displayShows() {
    const querySnapshot = await getDocs(collection(db, "shows"));
    const shows = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    shows.sort((a, b) => b.createdAt - a.createdAt);

    const tableBody = document.querySelector("#show-table tbody");
    const tableHeadRow = document.querySelector("#show-table thead tr");
    if (tableHeadRow.cells.length <= 6) {
        const imageHeader = document.createElement("th");
        imageHeader.textContent = "Image";
        tableHeadRow.insertBefore(imageHeader, tableHeadRow.cells[0]);
    }
    tableBody.innerHTML = "";

    shows.forEach(show => {
        const row = tableBody.insertRow();
        const imageCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const authorCell = row.insertCell(2);
        const directorCell = row.insertCell(3);
        const genreCell = row.insertCell(4);
        const yearCell = row.insertCell(5);
        const descriptionCell = row.insertCell(6);
        const linkCell = row.insertCell(7);

        const link = document.createElement("a");
        link.href = `entries/show-detail.html?id=${show.id}`;
        link.textContent = "Edit";
        linkCell.appendChild(link);

        titleCell.textContent = show.title;
        authorCell.textContent = show.author;
        directorCell.textContent = show.director;
        genreCell.textContent = show.genre;
        yearCell.textContent = show.year;
        descriptionCell.textContent = show.description;

        const img = document.createElement("img");
        img.src = show.image ? show.image : "";
        img.style.maxWidth = "100px";
        imageCell.appendChild(img);
    });
}

displayShows();