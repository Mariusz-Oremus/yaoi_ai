console.log("Plik manga.js załadowany!");


const heading = document.getElementById('show-heading');
const form = document.getElementById('show-form');

heading.addEventListener('click', function() {
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});

function nextStep(step) {
    document.getElementById(`step-${step}`).style.display = 'none';
    document.getElementById(`step-${step + 1}`).style.display = 'block';
}


//////////////////////////////////////////////////////////////////


function toggleOtherInput(selectElement, otherInputId) {
    const otherInput = document.getElementById(otherInputId);
    if (selectElement.value === 'other') {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
}

//////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("plot-rating");

    input.addEventListener("input", function (e) {
        let value = e.target.value;

        // Pozwalamy tylko na liczby 1-10 z jednym miejscem po kropce
        let regex = /^(10(\.0?)?|[1-9](\.\d?)?)$/;
        if (!regex.test(value)) {
            e.target.value = value.slice(0, -1);
        }
    });

    input.addEventListener("blur", function (e) {
        let value = e.target.value;
        if (value && !value.includes(".")) {
            e.target.value = value + ".0"; // Automatycznie dodajemy ".0"
        }
    });
});


//////////////////////////////////////////////////////////////////

function toggleExplain(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (textarea) {
        if (textarea.style.display === "none" || textarea.style.display === "") {
            textarea.style.display = "block";
        } else {
            textarea.style.display = "none";
        }
    } else {
        console.error("Nie znaleziono textarea o ID:", textareaId);
    }
}

///////////////////////////////// title format /////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const titleInputs = ["manga-title", "manga-country"];

    titleInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("blur", function () {
                input.value = formatTitle(input.value);
            });
        }
    });

    function formatTitle(title) {
        return title
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase()); // Każde pierwsze słowo z wielkiej litery
    }
});

///////////////////////////////// description max words /////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("plot-description");
    const wordCountDisplay = document.getElementById("word-count");
    const maxWords = 100;

    textarea.addEventListener("input", function () {
        let words = textarea.value.trim().split(/\s+/);
        let wordCount = words[0] === "" ? 0 : words.length;

        if (wordCount > maxWords) {
            // Truncate excess words
            textarea.value = words.slice(0, maxWords).join(" ");
            wordCount = maxWords;
        }

        wordCountDisplay.textContent = `Words: ${wordCount} / ${maxWords}`;
    });
});

///////////////////////////////// check whether required field is filled /////////////////////////////////

function nextStep(step) {
    const currentStep = document.getElementById(`step-${step}`);
    const inputs = currentStep.querySelectorAll('input, select, textarea');
    let allValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            allValid = false;
            input.reportValidity();
        }
    });

    if (allValid) {
        currentStep.style.display = 'none';
        const nextStep = document.getElementById(`step-${step + 1}`);
        if (nextStep) {
            nextStep.style.display = 'block';
        }
    }
}

///////////////////////////////// select up to three categories/tags /////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const maxGenres = 3;
    const selectedGenres = new Set(); // Stores selected genres
    const genreContainer = document.getElementById("selected-genres");
    const genreOtherInput = document.getElementById("genre-other");
    const addGenreOtherButton = document.getElementById("add-genre-other");

    function updateGenreDisplay() {
        genreContainer.innerHTML = "";
        selectedGenres.forEach(genre => {
            let genreTag = document.createElement("span");
            genreTag.textContent = genre;
            genreTag.className = "genre-tag";
            genreTag.onclick = () => removeGenre(genre);
            genreContainer.appendChild(genreTag);
        });
    }

    function addGenre(selectElement) {
        let selectedValue = selectElement.value;

        if (selectedValue === "other") {
            genreOtherInput.style.display = "block";
            addGenreOtherButton.style.display = "block";
            return;
        } else {
            genreOtherInput.style.display = "none";
            addGenreOtherButton.style.display = "none";
        }

        if (selectedGenres.size < maxGenres) {
            selectedGenres.add(selectedValue);
            updateGenreDisplay();
        } else {
            alert("You can only select up to 3 genres.");
        }

        // Reset select after selection
        selectElement.selectedIndex = 0;
    }

    function addOtherGenre() {
        const otherGenre = genreOtherInput.value.trim();
        if (otherGenre && selectedGenres.size < maxGenres) {
            selectedGenres.add(otherGenre);
            updateGenreDisplay();
            genreOtherInput.value = "";
            genreOtherInput.style.display = "none";
            addGenreOtherButton.style.display = "none";
        } else if (selectedGenres.size >= maxGenres) {
            alert("You can only select up to 3 genres.");
        }
    }

    function removeGenre(genre) {
        selectedGenres.delete(genre);
        updateGenreDisplay();
    }

    window.addGenre = addGenre; // Expose to global scope
    window.addOtherGenre = addOtherGenre; // Expose to global scope
});