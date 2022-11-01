    
    // library
    // oct 2022
    // author: daycla

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

//opens form
newBookButton.addEventListener('click', () => newBookForm.style.display = 'flex');

//runs form submission
formSubmit.addEventListener('click', () => formSubmitClick());

//runs when form is sumbitted, refreshes the rendered books and closes form)
function formSubmitClick() {
    addBookFromForm();
    clearBookshelf();
    fillBookshelf();
    newBookForm.style.display = 'none';
}

//master function that runs when page is loaded
function setPage() {
    fillBookshelf();
    booksRead.textContent = `${myLibrary.length} books`;
}

//book constructor
function Book(title, author, pages, readYet) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readYet = readYet
}   

//creates book object and adds to myLibrary from data on form
function addBookFromForm() {
    let title = document.querySelector('#formTitle').value;
    let author = document.querySelector('#formAuthor').value;
    let pages = document.querySelector('#formPages').value;
    let readYet = document.querySelector('#formReadYet').checked;

    let newBook = new Book(title, author, pages, readYet);
    myLibrary.push(newBook);

}

//meant to clear form fields upon submission, does not work 
function clearForm(title, author, pages, readYet) { 
    title.value = '';
    author.value = '';
    pages.value = '';
    readYet.checked = false;
}

//deletes all book elements (to be used for refreshing)
function clearBookshelf() {
    const allBooks = document.querySelectorAll('.book');
    for (const book of allBooks) {
        book.remove();
    }
}

//iterates myLibrary array runs generation funcs
function fillBookshelf() {
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    })

    addBookTools();
    addBookToolsListeners();
}

//creates html elements and values for given book
function createBookItem(book, index) {

    //if !book.title return
    //id !book.pages dont add 'pages' 

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
    //if book.pages != null
    bookPages.textContent = `${book.pages} pages`;
    bookPages.setAttribute('class', 'bookPages');

    //if (book.readyet) add class?

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookPages);

    booksList.appendChild(bookItem);

}

//adds edit button to each element with .book (split from createBookItem for size, but remaps books so unsure if optimal)
function addBookTools() {

    const bookItems = Array.from(document.querySelectorAll('.book'));

    bookItems.map((book, index) => {

        const bookToolsWrapper = document.createElement('div');
        bookToolsWrapper.setAttribute('class', 'bookToolsWrapper');
        book.appendChild(bookToolsWrapper);

        const bookEdit = document.createElement('button');
        bookEdit.setAttribute('type', 'button')
        bookEdit.setAttribute('class', 'bookTools bookEdit');
        bookEdit.setAttribute('id', index)
        bookEdit.textContent = 'edit';
        bookToolsWrapper.appendChild(bookEdit);

        const bookRemove = document.createElement('button');
        bookRemove.setAttribute('type', 'button')
        bookRemove.setAttribute('class', 'bookTools bookRemove');
        bookRemove.setAttribute('id', index)
        bookRemove.textContent = 'del';
        bookToolsWrapper.appendChild(bookRemove);

    })
}

function addBookToolsListeners() {
    const bookRemoveButton = document.querySelectorAll('.bookRemove');
    // const bookEditButton = Array.from(document.querySelectorAll('.bookEdit'));

    bookRemoveButton.forEach(brb => brb.addEventListener('click', function(e) {
        myLibrary.splice(e.target.id, 1);
        clearBookshelf();
        fillBookshelf();
    }))
}

setPage();
