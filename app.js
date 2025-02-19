document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').value;

    const book = {
        title: title,
        author: author,
        pages: pages,
        status: status
    };

    addBookToList(book);
    clearForm();
});

function addBookToList(book) {
    const bookList = document.getElementById('bookList');

    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${book.title}</strong> by ${book.author} (${book.pages} pages) - Status: ${book.status}
    `;

    bookList.appendChild(li);
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('status').value = 'unread';
}