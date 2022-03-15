const form = document.querySelector("#add-book");
const newTitle = document.querySelector("#title");
const newAuthor = document.querySelector("#author");
const newPages = document.querySelector("#pages");
const newRead = document.querySelector("#read");
const newBook = document.querySelector("#new-book");

const library = document.querySelector("#library");

let  myLibrary = [];

newBook.addEventListener("click", function(){
    addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.checked);
    form.reset();
    library.innerHTML = ""
    listBooks(); 
    addReadButton();
    addRemoveButton();
});

function addReadButton(){
    let buttons = document.querySelectorAll(".read-button");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(e){
            if (e.target.innerHTML == "Not Completed"){
                e.target.innerHTML = "Completed"
            }else e.target.innerHTML = "Not Completed"
        })        
    }
}

function addRemoveButton(){
    let buttons = document.querySelectorAll(".remove-button");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(e){
            let data = e.target.getAttribute('data-title');
            console.log(myLibrary, data)
            removeBook(data);
            library.innerHTML = ""
            listBooks(); 
            addReadButton();
            addRemoveButton();
        })        
    }
}



function Book(id, title, author, pages, read){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let id = Math.floor(Math.random()*90000) + 10000;
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book)
    console.log(myLibrary)
}


function removeBook(data){

    myLibrary.find((obj, i) => {
        if (obj.id == data) {
            myLibrary.splice(i, 1)
            return true;
        }
    });
}

function listBooks(){
    for(let i = 0; i < myLibrary.length; i++){
        let div = document.createElement('div');
        div.classList.add("book-card")
        let read;
        console.log(myLibrary[i].read)
        if (myLibrary[i].read == true){
            read = "Completed";
        }else read = "Not Completed";
        let newCard = `<h1>Title: ${myLibrary[i].title}</h1>
            <h1>Author: ${myLibrary[i].author}</h1>
            <h1>${myLibrary[i].pages} Pages</h1>
            <button class="read-button">${read}</button>
            <button class="remove-button" data-title=${myLibrary[i].id}>Remove</button>`;
        div.innerHTML = newCard;
        library.appendChild(div);
    }
}


