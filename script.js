let score = 0;
let isGameOver = false;
const fruitTypes = ["apple.png", "banana.png", "mango.png"];
const bombImage = "bomb.png";

const cutSound = new Audio("cut.mp3");
const bombSound = new Audio("bomb.mp3");

function createFruit() {
  if (isGameOver) return;

  const fruit = document.createElement("img");
  fruit.classList.add("fruit");

  let fruitType;

  // Don't show bomb at start of game
  if (score === 0) {
    fruitType = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
  } else {
    fruitType = Math.random() < 0.2 ? bombImage : fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
  }

  fruit.src = fruitType;
  fruit.style.left = Math.random() * 90 + "vw";
  fruit.style.top = "-100px";

  document.getElementById("gameContainer").appendChild(fruit);

  let fallInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(fallInterval);
      fruit.remove();
      return;
    }

    const top = parseInt(fruit.style.top);
    if (top >= window.innerHeight) {
      fruit.remove();
      clearInterval(fallInterval);
    } else {
      fruit.style.top = top + 5 + "px";
    }
  }, 30);

  fruit.onclick = function () {
    if (fruitType === bombImage) {
      bombSound.play();
      endGame();
    } else {
      cutSound.play();
      fruit.remove();
      score++;
      document.getElementById("score").textContent = score;
    }
  };
}

function gameLoop() {
  if (!isGameOver) {
    createFruit();
  }
}
setInterval(gameLoop, 1000);

function endGame() {
  isGameOver = true;

  const fruits = document.querySelectorAll(".fruit");
  fruits.forEach(fruit => fruit.remove());

  document.getElementById("finalScore").textContent = score;
  document.getElementById("gameOverScreen").style.display = "block";
}

function restartGame() {
  isGameOver = false;
  score = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("gameOverScreen").style.display = "none";
}
