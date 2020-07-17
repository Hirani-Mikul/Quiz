const username = document.getElementById("username");
const saveBtn = document.getElementById("saveBtn");
const mostRecentPlayerScore = localStorage.getItem("recentPlayerScore");
const finalScore = document.getElementById("final-score");
const HIGHSCORE = JSON.parse(localStorage.getItem("HIGH_SCORE")) || [];

const MaxNumHighscore = 5;

finalScore.innerText = mostRecentPlayerScore || 0;

username.addEventListener("keyup", () => {
  saveBtn.disabled = !username.value.trim();
});

saveScore = (e) => {
  e.preventDefault();

  const score = {
    score: parseInt(mostRecentPlayerScore),
    username: username.value,
  };
  HIGHSCORE.push(score);

  HIGHSCORE.sort((a, b) => b.score - a.score);
  HIGHSCORE.splice(MaxNumHighscore);
  localStorage.setItem("HIGH_SCORE", JSON.stringify(HIGHSCORE));

  username.value = "";
  setTimeout(() => {
    return window.location.assign("../index.html");
  }, 1000);
};
