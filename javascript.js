    
    // library
    // oct 2022
    // author: daycla

const booksList = document.querySelector('.booksList');
const newBookButton = document.querySelector('.newBookButton');
const newBookForm = document.querySelector('.newBookForm');
const formSubmit = document.querySelector('#formSubmit');
const booksCounter = document.querySelector('#booksRead');

//allows edit and save of username
const username = document.querySelector('#username');
    username.setAttribute('contenteditable', true);
    username.textContent = localStorage.getItem('username') || "user";
    username.addEventListener('keyup', () => localStorage.setItem('username', (username.textContent)));

let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

// exampleZero = new Book("Title", "Author", 100, false);
// exampleOne = new Book("Left Hand", "Ursula", 300, false);
// exampleTwo = new Book("Limoncello", "Lacroix", 0, false);
// exampleThree = new Book("Marriage of Heaven and Hell", "William Blake", 150, true);
// exampleFour = new Book("Band-Aid", "Fabric", 16, true);

// myLibrary.push(exampleZero);
// myLibrary.push(exampleOne);
// myLibrary.push(exampleTwo);
// myLibrary.push(exampleThree);
// myLibrary.push(exampleFour);

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
//redundant but for naming purposes ... 
function setPage() {
    fillBookshelf();
}

//counts books 
function setBooksCounter() {
    const count = myLibrary.length;
    booksCounter.textContent = `${count} books`;
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

    if (!title) {
        alert("Your book needs a title!");
        return
    }

    let newBook = new Book(title, author, pages, readYet);
    myLibrary.push(newBook);

    newBookForm.reset();

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
    sortByReadYet();
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    })

    //could remove map/for each within each of these functions,
    //put functions inside the map above^ :)
    
    addBookTools();
    addBookToolsListeners();
    setBooksCounter();
}

function sortByReadYet() {
    myLibrary.sort((a, b) => (a.readYet > b.readYet) ? 1 : -1);
}

//creates html elements and values for given book
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
    //if book.pages != null
    bookPages.textContent = `${book.pages} pages`;
    bookPages.setAttribute('class', 'bookPages');

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
        bookEdit.setAttribute('class', 'bookTools bookReadYetStatus');
        bookEdit.setAttribute('id', index)
        bookEdit.textContent = 'read';
        bookToolsWrapper.appendChild(bookEdit);

        const bookRemove = document.createElement('button');
        bookRemove.setAttribute('type', 'button')
        bookRemove.setAttribute('class', 'bookTools bookRemove');
        bookRemove.setAttribute('id', index)
        bookRemove.textContent = 'del';
        bookToolsWrapper.appendChild(bookRemove);

    })

    //readYet indicator
    bookItems.forEach((book, index) => {
        if(myLibrary[index].readYet) {
        const bookReadYet = document.createElement('img');
        bookReadYet.setAttribute('src', 'images/book-check-outline.svg');
        bookReadYet.setAttribute('class', 'bookReadYetIndicator');
        book.appendChild(bookReadYet);
        }
    })
}

function addBookToolsListeners() {
    const bookRemoveButton = document.querySelectorAll('.bookRemove');
    const bookReadYetStatusButton = document.querySelectorAll('.bookReadYetStatus');

    bookRemoveButton.forEach(brb => brb.addEventListener('click', function(e) {
        myLibrary.splice(e.target.id, 1);
        clearBookshelf();
        fillBookshelf();
    }))

    bookReadYetStatusButton.forEach(ryb => ryb.addEventListener('click', function(e) {
        const index = e.target.id;
        myLibrary[index].readYet = !(myLibrary[index].readYet);
        clearBookshelf();
        fillBookshelf();
    }))


}

setPage();

//i love you!