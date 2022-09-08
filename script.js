let library = [];

const book = document.querySelector("#book-name");
const author = document.querySelector("#author-name");
const status = document.querySelector("#status");
const form = document.querySelector("#form");
const table = document.querySelector("#table-body");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    showBooks();
})

class Book {
    constructor (title, author, status) {
        this.title = title;
        this.author = author;
        this. status =  status;
    }
}

function clearForm() {
    book.value = "";
    author.value = "";
}

function addBookToLibrary() {
    if (book.value == "" || author.value == "") {
        alert("Please fill the wanted informations");
        return;
    }
    let newBook = new Book(book.value, author.value, status.value)
    library.push(newBook);
    updateLocalStorage();
    return;
}

function findBook(title) {
    return library.find((b)=> b.title.toLowerCase() === title.toLowerCase());
}

function changeStatus(title) {
    let targetedBook = findBook(title);
    if (targetedBook.status === "read") {
        targetedBook.status = "not read"
    } else {
        targetedBook.status = "read"
    }
    updateLocalStorage();
    showBooks();
}

function deleteBook(title) {
    let targetedBook = findBook(title);
    if(confirm(`Are you sure you want to delete '${targetedBook.title}'`)) {
        library = library.filter((b)=> b.title.toLowerCase() != targetedBook.title.toLowerCase() )
    }
    updateLocalStorage();
    showBooks();
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
    if (localStorage.getItem("library")) {
        library = JSON.parse(localStorage.getItem("library"))
    } else {
        library = [];
    }
}

function showBooks() {
    checkLocalStorage();
    table.innerHTML = "";
    library.forEach((b) => {
        let addedHtml = `
        <tr>
            <td>${b.title}</td>
            <td>${b.author}</td>
            <td><button class="status-button" data-name="${b.title}" onclick="changeStatus('${b.title}')">${b.status}</button></td>
            <td><button class="delete-button" data-name="${b.title}" onclick="deleteBook('${b.title}')">DELETE</button></td>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", addedHtml);
    })
}

showBooks();