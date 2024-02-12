// globals
let current = "a";
let life = 5;
let score = 0;
const letters = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const lifeElement = document.getElementById("life");
const scoreElement = document.getElementById("score");

// functions
function generateRandomLetter() {
  const index = Math.floor(Math.random() * letters.length);
  return [letters[index], index];
}

function displayLetter(letter) {
  display.innerText = letter;
}

function mark(index) {
  buttons[index].classList.add("bg-green-500");
}

function unMark() {
  const i = letters.indexOf(current);
  buttons[i].classList.remove("bg-green-500");
}

function markError(index) {
  buttons[index].classList.remove("border-transparent");
  buttons[index].classList.add("border-red-500");
}

function unMarkError(index) {
  const btn = document.querySelector(".border-red-500");
  if (btn) {
    btn.classList?.add("border-transparent");
    btn.classList?.remove("border-red-500");
  }
}

function updateStatus() {
  if (!life) {
    alert("The End");
    life = 5;
    score = 0;
    unMark();
    main();
    return;
  }
  if (life < 3) {
    lifeElement.classList.add("text-red-500");
    lifeElement.classList.remove("text-green-500");
  } else {
    lifeElement.classList.add("text-green-500");
    lifeElement.classList.remove("text-red-500");
  }
  lifeElement.innerText = life;
  scoreElement.innerText = score;
}

function main() {
  const [currentLetter, index] = generateRandomLetter();
  current = currentLetter;
  displayLetter(currentLetter);
  updateStatus();
  mark(index);
  unMarkError();
}

function action(key) {
  if (key === current) {
    unMarkError();
    unMark();
    main();
    score++;
  } else {
    const i = letters.indexOf(key);
    unMarkError();
    markError(i);
    life--;
  }
  updateStatus();
}

main();

document.addEventListener("keypress", ({ key }) => {
  action(key);
});

buttons.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    console.log(event.target.innerText.toLowerCase());
    action(event.target.innerText.toLowerCase());
  })
);
