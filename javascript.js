//each entry
//div container (span.title span.author span.pages etc)

//when new book button clikced
//slide main down, revealing form which is "behind " it in space under header

//var data = new FormData();
//<input type="email" id="user-email"/> 
//data.append("email", document.getElementById("user-email").value);
//simple method to get data from html form into object (run func on submit button click)

//take data from form
//create book
//create element for each piece of data
//append all data elements to book
//add book to shelf

const booksList = document.querySelector('.booksList');
const newBookButton = document.querySelector('.newBookButton');
const newBookForm = document.querySelector('.newBookForm');
const formSubmit = document.querySelector('#formSubmit');
const booksRead = document.querySelector('#booksRead');

let myLibrary = [];

exampleOne = new Book("Left Hand", "Ursula", 300, false);
exampleTwo = new Book("Limoncello", "Lacroix", 0, true);
exampleThree = new Book("Marriage of Heaven and Hell", "William Blake", 150, true);

myLibrary.push(exampleOne);
myLibrary.push(exampleTwo);
myLibrary.push(exampleThree);
myLibrary.push(exampleThree);
myLibrary.push(exampleThree);

newBookButton.addEventListener('click', () => newBookForm.style.display = 'flex');
formSubmit.addEventListener('click', () => formSubmitClick());

function formSubmitClick() {
    addBookFromForm();
    clearBookshelf();
    fillBookshelf();
    newBookForm.style.display = 'none';
}

function setPage() {
    fillBookshelf();
    booksRead.textContent = `${myLibrary.length} books`;
}
 
function Book(title, author, pages, readYet) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readYet = readYet
}   

function addBookFromForm() {
    let title = document.querySelector('#formTitle').value;
    let author = document.querySelector('#formAuthor').value;
    let pages = document.querySelector('#formPages').value;
    let readYet = document.querySelector('#formReadYet').checked;

    let newBook = new Book(title, author, pages, readYet);
    myLibrary.push(newBook);
}

function clearBookshelf() {
    const allBooks = document.querySelectorAll('.book');
    for (const book of allBooks) {
        book.remove();
    }
}

function fillBookshelf() {
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    })

    addBookTools();
}

function createBookItem(book, index) {

    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', index)
    bookItem.setAttribute('class', 'book');

    const bookTitle = document.createElement('h1');
    bookTitle.textContent = book.title;
    bookTitle.setAttribute('class', 'bookTitle');

    const bookAuthor = document.createElement('h1');
    bookAuthor.textContent = book.author;
    bookAuthor.setAttribute('class', 'bookAuthor');

    const bookPages = document.createElement('h1');
    bookPages.textContent = `${book.pages} pages`;
    bookPages.setAttribute('class', 'bookPages');

    //if (book.readyet) add class 

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookPages);

    booksList.appendChild(bookItem);

}

function addBookTools() {

    const bookItems = Array.from(document.querySelectorAll('.book'));
    // console.log(bookItems)

    bookItems.map((book) => {

        const bookToolsWrapper = document.createElement('div');
        bookToolsWrapper.setAttribute('class', 'bookToolsWrapper');
        book.appendChild(bookToolsWrapper);

        const bookEdit = document.createElement('button');
        bookEdit.setAttribute('class', 'bookTools');
        bookEdit.setAttribute('id', 'bookEdit')
        bookEdit.textContent = 'edit';
        bookToolsWrapper.appendChild(bookEdit);

    })
}

setPage();
