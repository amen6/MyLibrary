let library = [];

const book = document.querySelector("#book-name");
const author = document.querySelector("#author-name");
const status = document.querySelector("#status");
const table = document.querySelector("#table-body");
const form = document.querySelector("#form");
let deleteButtons = document.querySelectorAll(".delete-button");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    clearForm();
    showLibrary();
})

class Book {
    constructor(title, author, status) {
        this.title = title;
        this.author = author;
        this.status = status;
      }
}

function clearForm() {
    book.value = "";
    author.value = "";
}

function addBookToLibrary() {
    if (book.value.length === 0 || author.value.length === 0) {
        alert("Please fill the wanted informations");
        return;
    }
    if (getBook(book.value)) {
        alert(`${book.value} already exist in your library`)
        return;
    }
    let newBook = new Book(book.value, author.value, status.value);
    library.push(newBook);
    updateLocalStorage();
    return;
}
  
function changeStatus(title) {
    let targetBook = getBook(title);
    if (targetBook.status === "read") {
        targetBook.status = "not read";
    } else targetBook.status = "read";
    updateLocalStorage();
    showLibrary();
}

function deleteBook(title) {
    library = library.filter((book) => book.title.toLowerCase() != title.toLowerCase())
}

function getBook(title) {
    return library.find((book) => book.title.toLowerCase() === title.toLowerCase())
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
    if(localStorage.getItem("library")) {
        library = JSON.parse(localStorage.getItem("library"))
    } else {
        library = []
    }
}

function showLibrary() {
    checkLocalStorage();
    table.innerHTML = "";
    library.forEach((book) => {
        let htmlItem = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><button class="status-button" data-name="${book.title}" onclick="changeStatus('${book.title}')">${book.status}</button></td>
            <td><button class="delete-button" data-name="${book.title}">DELETE</button></td>
        </tr>
        `;
    table.insertAdjacentHTML("afterbegin", htmlItem)
    })
    deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(element => {
        element.addEventListener("click", e => {
            if(confirm(`Are you sure you want to delete '${e.target.getAttribute('data-name')}'`)) {
                deleteBook(e.target.getAttribute('data-name'))
            }
            updateLocalStorage();
            showLibrary();
        })
    });
    return;
}

showLibrary();