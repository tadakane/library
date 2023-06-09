let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readValue = this.read ? "Already read" : "Not read yet";
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + readValue;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    let table = document.querySelector(".table");
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--){
        table.deleteRow(i);
    }
    displayBooks(myLibrary);
    rowCount++;
}

function libraryTable() {
    let books = document.querySelector(".books");
    let table = document.createElement("table");
    books.appendChild(table);
    table.classList.add("table");
    let headers = document.createElement("tr");
    table.appendChild(headers);

    let header = document.createElement("th");
    headers.appendChild(header);
    header.textContent = "Title";

    header = document.createElement("th");
    headers.appendChild(header);
    header.textContent = "Author";

    header = document.createElement("th");
    headers.appendChild(header);
    header.textContent = "Page Count";

    header = document.createElement("th");
    headers.appendChild(header);
    header.textContent = "Status";
} 

function displayBooks(library){
    let table = document.querySelector(".table");

    for (let book of library) {
        let row = document.createElement("tr");
        table.appendChild(row);
        for (let item in book) {
            if (item == "read") {
                let cell = document.createElement("td");
                row.appendChild(cell);
                input = document.createElement("select");

                let option = document.createElement("option");
                option.setAttribute("selected", "true");
                option.setAttribute("value", book[item]);
                option.textContent = book[item];
                input.appendChild(option);

                if (book[item] != "Finished") {
                    option = document.createElement("option");
                    option.setAttribute("value", "Finished");
                    option.textContent = "Finished";
                    input.appendChild(option);
                }

                if (book[item] != "Reading") {
                    option = document.createElement("option");
                    option.setAttribute("value", "Reading");
                    option.textContent = "Reading";
                    input.appendChild(option);
                }

                if (book[item] != "Paused") {
                    option = document.createElement("option");
                    option.setAttribute("value", "Paused");
                    option.textContent = "Paused";
                    input.appendChild(option);
                }

                if (book[item] != "Plan To Read") {
                    option = document.createElement("option");
                    option.setAttribute("value", "Plan To Read");
                    option.textContent = "Plan To Read";
                    input.appendChild(option);
                }
                
                if (book[item] != "Dropped") {
                    option = document.createElement("option");
                    option.setAttribute("value", "Dropped");
                    option.textContent = "Dropped";
                    input.appendChild(option);
                }
                
                cell.appendChild(input);
            }
            if (item != "info" && item != "read") {
                let cell = document.createElement("td");
                row.appendChild(cell);
                cell.textContent = book[item];
            }
        }
        cell = document.createElement("td");
        row.appendChild(cell);
        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("id", "remove");
        removeBtn.textContent = "REMOVE";
        removeBtn.setAttribute("type", "button");
        removeBtn.addEventListener("click", function() {
            console.log(this.parentNode.parentNode.rowIndex);
            myLibrary.splice(this.parentNode.parentNode.rowIndex - 1, 1);
            for (let i = table.rows.length - 1; i > 0; i--) {
                table.deleteRow(i);
            }
            displayBooks(myLibrary);
        })
        cell.appendChild(removeBtn);
    }
}

function bookForm() {
    let newBtn = document.querySelector("#new");
    newBtn.setAttribute("disabled", "true");
    newBtn.setAttribute("hidden", "true");

    let books = document.querySelector(".books");
    let extra = document.createElement("div");
    extra.classList.add("extra");
    books.appendChild(extra);

    let inputField = document.createElement("div");
    inputField.classList.add("input_field");

    let container = document.createElement("div");
    let label = document.createElement("label");
    inputField.appendChild(label);
    label.setAttribute("for", "title");
    label.textContent = "Title: ";
    let input = document.createElement("input");
    container.appendChild(label);
    container.appendChild(input);
    input.setAttribute("id", "title");
    input.setAttribute("name", "title");
    inputField.appendChild(container);

    container = document.createElement("div");
    label = document.createElement("label");
    inputField.appendChild(label);
    label.setAttribute("for", "author");
    label.textContent = "Author: ";
    input = document.createElement("input");
    container.appendChild(label);
    container.appendChild(input);
    input.setAttribute("id", "author");
    input.setAttribute("name", "author");
    inputField.appendChild(container);

    container = document.createElement("div");
    label = document.createElement("label");
    inputField.appendChild(label);
    label.setAttribute("for", "pages");
    label.textContent = "Page Count: ";
    input = document.createElement("input");
    container.appendChild(label);
    container.appendChild(input);
    input.setAttribute("id", "pages");
    input.setAttribute("name", "page count");
    inputField.appendChild(container);

    container = document.createElement("div");
    label = document.createElement("label");
    inputField.appendChild(label);
    label.setAttribute("for", "status");
    label.textContent = "Status: ";
    input = document.createElement("select");
    container.appendChild(label);
    container.appendChild(input);

    let option = document.createElement("option")
    option.setAttribute("disabled", "true");
    option.setAttribute("selected", "true");
    option.setAttribute("value", "");
    option.textContent = "--Select Status--"
    input.appendChild(option);

    option = document.createElement("option");
    option.setAttribute("value", "Finished");
    option.textContent = "Finished";
    input.appendChild(option);

    option = document.createElement("option");
    option.setAttribute("value", "Reading");
    option.textContent = "Reading";
    input.appendChild(option);

    option = document.createElement("option");
    option.setAttribute("value", "Paused");
    option.textContent = "Paused";
    input.appendChild(option);

    option = document.createElement("option");
    option.setAttribute("value", "Plan To Read");
    option.textContent = "Plan To Read";
    input.appendChild(option);

    option = document.createElement("option");
    option.setAttribute("value", "Dropped");
    option.textContent = "Dropped";
    input.appendChild(option);

    input.setAttribute("id", "status");
    input.setAttribute("name", "status");
    inputField.appendChild(container);

    let addBtn = document.createElement("button");
    addBtn.setAttribute("id", "add");
    addBtn.textContent = "ADD BOOK";
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute('onclick', "addHelper()");

    extra.appendChild(inputField);
    extra.appendChild(addBtn);
}

function addHelper() {
    if (document.querySelector("#title").value != "") {
        let newBook = new Book(document.querySelector("#title").value, 
                        document.querySelector("#author").value,
                        document.querySelector("#pages").value,
                        document.querySelector("#status").value);
        addBookToLibrary(newBook);
    }
    let extra = document.querySelector(".extra");
    extra.remove();

    let newBtn = document.querySelector("#new");
    newBtn.removeAttribute("disabled", "false");
    newBtn.removeAttribute("hidden", "false");
}

libraryTable();
rowCount = 0;