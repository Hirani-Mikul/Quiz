const listing = document.getElementById("listing");

const HIGHSCORES = JSON.parse(localStorage.getItem("HIGH_SCORE")) || [];

listing.innerHTML = HIGHSCORES.map((element) => {
  return `<li><span>${element.username}</span><span>${element.score}</span></li>`;
}).join("");
