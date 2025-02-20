// Firebase UI Config
const uiConfig = {
    signInSuccessUrl: '/', // Redirect after successful sign-in
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

// Initialize Firebase UI
const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

// Track Auth State
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById('firebaseui-auth-container').style.display = 'none';
        document.getElementById('logged-in-content').style.display = 'block';
        loadBooks(user.uid);
    } else {
        // User is signed out
        document.getElementById('firebaseui-auth-container').style.display = 'block';
        document.getElementById('logged-in-content').style.display = 'none';
    }
});

// Handle Book Form Submission
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').value;

    const user = auth.currentUser;
    if (user) {
        const book = {
            title: title,
            author: author,
            pages: pages,
            status: status,
            userId: user.uid // Associate book with the user
        };

        // Add book to Firestore
        db.collection('books').add(book)
            .then(() => {
                loadBooks(user.uid); // Reload books after adding
                clearForm();
            })
            .catch((error) => {
                console.error('Error adding book: ', error);
            });
    }
});

// Load Books for the Current User
function loadBooks(userId) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear the list

    db.collection('books')
        .where('userId', '==', userId) // Filter by user ID
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const book = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${book.title}</strong> by ${book.author} (${book.pages} pages) - Status: ${book.status}
                `;
                bookList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error loading books: ', error);
        });
}

// Clear Form
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('status').value = 'unread';
}