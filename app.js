const books = [
  { 
      title: "Harry Potter & The Cursed Child",
      author: "J.K Rowling", 
      genre: "fantasy", 
      price: 8, 
      description: "Harry Potter and the Cursed Child is a fantasy drama that follows Harry Potters son, Albus, as he grapples with family legacy and time-traveling challenges.." 
   },
  { 
      title: "The Anxious Generation", 
      author: "Jonathan Haidt", 
      genre: "non-fiction", 
      price: 22, 
      description: "Explains how smartphones and social media are impacting children's mental health and development." 
   },
  { 
      title: "The Women", 
      author: "Kristin Hannah", 
      genre: "fiction", 
      price: 20, 
      description: "A historical novel following a young nurse's harrowing experiences during the Vietnam War." 
   },
  { 
      title: "Funny Story", 
      author: "Emily Henry", 
      genre: "romance", 
      price: 11, 
      description: "A charming tale of unexpected roommates navigating heartbreak and finding love in the most unlikely circumstances."
   },
  { 
      title: "The God of the Woods", 
      author: "Liz Moore", 
      genre: "mystery", 
      price: 20,
      description: "A teenager's disappearance in 1975 mirrors her brother's vanishing years earlier, uncovering deep family secrets." 
   },
  { 
      title: "A Box Full of Darkness", 
      author: "Simone St. James", 
      genre: "thriller", 
      price: 19, 
      description: "Haunted by her brother's ghost, a woman uncovers terrifying truths in her childhood home." 
    },
  { 
      title: "The Shining", 
      author: "Stephen King", 
      genre: "horror", 
      price: 10.99, 
      description: "A haunted hotel slowly drives its caretaker into madness as supernatural forces torment his family." 
   }, 
  { 
      title: "The Haunting of Hill House", 
      author: "Shirley Jackson", 
      genre: "horror", 
      price: 9.99, 
      description: "A chilling tale of four strangers exploring a mansion that harbors a dark and mysterious presence." 
   },
  { 
    title: "My Life in Red and White", 
    author: "Arsène Wenger", 
    genre: "sports", 
    price: 10.99, 
    description: "An insightful memoir from legendary Arsenal manager Arsène Wenger, reflecting on his football career and philosophy." 
   }, 
  { 
    title: "Open", 
    author: "Andre Agassi", 
    genre: "sports", 
    price: 9.99, 
    description: "A raw and honest autobiography by tennis legend Andre Agassi, detailing his battles on and off the court." 
   } 
];

const form = document.getElementById("bookForm");
const results = document.getElementById("results");
const wishlist = document.getElementById("wishlist");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const genre = document.getElementById("genre").value.toLowerCase();
  const author = document.getElementById("author").value.toLowerCase();
  const price = document.getElementById("price").value;

  const matches = books.filter(book =>
    (genre === "" || book.genre === genre) &&
    (author === "" || book.author.toLowerCase().includes(author)) &&
    (price === "" || book.price <= parseFloat(price))
  );

  results.innerHTML = "";

  if (matches.length === 0) {
    results.innerHTML = "<p>No books found.</p>";
  } else {
    matches.forEach(book => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${book.title}</strong> by ${book.author}<br>
        Genre: ${book.genre}, £${book.price}<br>
        ${book.description}<br>
        <button onclick="addToWishlist('${book.title}')">Add to Wishlist</button>
        <hr>
      `;
      results.appendChild(div);
    });
  }
});

function addToWishlist(title) {
  const book = books.find(b => b.title === title);
  let saved = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!saved.find(b => b.title === title)) {
    saved.push(book);
    localStorage.setItem("wishlist", JSON.stringify(saved));
    showWishlist();
  }
}

function showWishlist() {
  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.innerHTML = "";

  saved.forEach(book => {
    const item = document.createElement("div");
    item.innerHTML = `<strong>${book.title}</strong> by ${book.author} (£${book.price})<br>`;
    wishlist.appendChild(item);
  });
}

function clearWishlist() {
  localStorage.removeItem("wishlist");
  showWishlist();
}
showWishlist();
