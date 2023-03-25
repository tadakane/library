let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let readValue = this.read ? 'already read' : 'not read yet';
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + readValue;
}


function addBookToLibrary(book) {
    myLibrary.push(book);
}