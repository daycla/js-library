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

let myLibrary = [];


