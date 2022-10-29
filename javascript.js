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

function Book(title, author, pages) {
    this.title = title,
    this.author = author,
    this.pages = pages
}

Book.prototype.spine = function() {
    let spine = document.createElement('div');
    spine.classList.add('book');
    booksList.appendChild(spine);

    let spineTitle = document.createElement('p');
    spineTitle.textContent = this.title;
    spine.appendChild(spineTitle);
}

exampleOne = new Book("Left Hand of Darkness", "Ursula K LeGuin", "450");

exampleOne.spine();

// function retrieveFormData() {
//     let title = document.getElementById("formTitle").value;
//     let author = document.getElementById("formAuthor").value;
//     let pages = document.getElementById("formPages").value;

//     let newBookOne = new Book(title, author, pages);
//     return newBookOne;
// }

function addBooktoShelf() {
    let title = document.getElementById("formTitle").value;
    let author = document.getElementById("formAuthor").value;
    let pages = document.getElementById("formPages").value;
    let newBook = new Book(title, author, pages);
    newBook.spine();
}

addBooktoShelf();