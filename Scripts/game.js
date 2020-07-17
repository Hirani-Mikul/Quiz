const Question_Text = document.getElementById("question-text");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const scoreText = document.getElementById("score");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBarFull");

const skipBtn = document.getElementById("skipBtn");
const previousBtn = document.getElementById("previous-btn");
let availableQuestion = [];
let QuestionCounter = 0;
let currentQuestion = {};
let acceptAnswer = false;
let questionLoaded = false;
let correctChoice;
let markedQuestion = [];
let QuestionData = [];

let score = 0;

function Start() {
  QuestionCounter = 0;
  score = 0;
  availableQuestion = [...Questions];
  getQuestion();
}

function goToPreviousQuestion() {
  if (markedQuestion.length > 0 && QuestionCounter > 1) {
    skipBtn.innerText = "Next";
    QuestionCounter--;
    currentQuestion = markedQuestion[QuestionCounter - 1];
    updateQuestion();
  }
}

function goToNextQuestion() {
  QuestionCounter++;
  currentQuestion = QuestionData[QuestionCounter - 1];
  if (!currentQuestion.isMarked) skipBtn.innerText = "Skip";
  updateQuestion();
}

function handleNextAndSkip() {
  if (!questionLoaded) return;
  questionLoaded = false;
  if (currentQuestion.isMarked) goToNextQuestion();
  else skipQuestion();
}

function skipQuestion() {
  currentQuestion.isMarked = true;
  markedQuestion.push(currentQuestion);
  correctChoice[0].parentElement.classList.add("show-correct");

  setTimeout(() => {
    correctChoice[0].parentElement.classList.remove("show-correct");
    getQuestion();
  }, 500);
}

function leave() {
  return window.location.assign("../index.html");
}

function getQuestion() {
  if (availableQuestion.length === 0 || QuestionCounter >= Questions.length) {
    localStorage.setItem("recentPlayerScore", score);
    return window.location.assign("../Pages/result.html");
  }

  QuestionCounter++;

  progressText.innerText = `Question: ${QuestionCounter} / ${Questions.length}`;
  progressBar.style.width = `${(QuestionCounter / Questions.length) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionIndex];

  updateQuestion();

  QuestionData.push(currentQuestion);

  availableQuestion.splice(questionIndex, 1);
  acceptAnswer = true;
}

function updateQuestion() {
  previousBtn.disabled = QuestionCounter == 1;

  Question_Text.innerText = QuestionCounter + ". " + currentQuestion.Que;

  choices.forEach((choice, i) => {
    choices[i].innerText = currentQuestion.Opts[i];
  });

  correctChoice = choices.filter((choice) => {
    const correctAnswer = currentQuestion.answer;
    if (choice.dataset.number == correctAnswer) return choice;
  });
  questionLoaded = true;
}

choices.forEach((choice, index) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswer || currentQuestion.isMarked) return;
    acceptAnswer = false;

    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const output =
      selectedAnswer == currentQuestion.answer ? "correct" : "wrong";

    if (output === "correct") updateScore();
    else correctChoice[0].parentElement.classList.add("show-correct");

    selectedOption.parentElement.classList.add(output);
    currentQuestion.isMarked = true;
    markedQuestion.push(currentQuestion);

    setTimeout(() => {
      correctChoice[0].parentElement.classList.remove("show-correct");
      selectedOption.parentElement.classList.remove(output);
      getQuestion();
    }, 1000);
  });
});

function updateScore() {
  score += 10;
  scoreText.innerText = score;
}

Start();
