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



function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book)
    console.log(myLibrary)
}


function removeBook(data){

    myLibrary.find((obj, i) => {
        if (obj.title == data) {
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
        let newCard = `<h1>${myLibrary[i].title}</h1>
            <h1>${myLibrary[i].author}</h1>
            <h1>${myLibrary[i].pages}</h1>
            <button class="read-button">${read}</button>
            <button class="remove-button" data-title=${myLibrary[i].title}>Remove</button>`;
        div.innerHTML = newCard;
        library.appendChild(div);
    }
}


