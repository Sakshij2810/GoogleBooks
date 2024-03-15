//https://www.googleapis.com/books/v1/volumes?q=quilting

let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", fetchBooks);

let allBooks = document.getElementById("allBooks");

let content = "";

function fetchBooks() {
  //step 1 = read user input
  let bookTitle = document.getElementById("bookTitle").value;

  // step 2 = create the request
  let myRequest = new XMLHttpRequest(); //ready state = 0

  myRequest.open(
    "GET",
    `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`
  ); //ready state = 1

  // send the request and recieve the response
  myRequest.send(); //ready state = 2

  //server processing //ready state = 3
  //response recived // ready state = 4

  myRequest.onreadystatechange = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
      let convertedBook = JSON.parse(myRequest.responseText);

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
    }
    allBooks.innerHTML = content;
  };
}
