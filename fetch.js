let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", fetchBooks);

let allBooks = document.getElementById("allBooks");

let content = "";

async function fetchBooks() {
  //step 1 = read user input
  let bookTitle = document.getElementById("bookTitle").value;

  // step 2 = create the request
  let response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`
  );

  // send the request and recieve the response
  let convertedBook = await response.json();

  let newBook = convertedBook.items
    .map(
      (book) => `
         <div class = "book">
            <img src = "${book.volumeInfo.imageLinks.thumbnail}"/>
            <h1>${book.volumeInfo.title}</h1>
            <p>${book.volumeInfo.description}</p>
        </div>`
    )
    .join("");

  content += newBook;
  allBooks.innerHTML = content;
}
