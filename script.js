const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
let score = 0;

// 🔊 Load sounds
const cutSound = new Audio("knife.mp3");
const bombSound = new Audio("bomb.mp3");

// 🍎 Fruit list
const fruits = ["apple.png", "banana.png","watermelon.png","mango.png", "bomb.png"];

// 🍌 Create fruit
function createFruit() {
  const fruit = document.createElement("img");
  const fruitType = fruits[Math.floor(Math.random() * fruits.length)];
  fruit.src = "images/" + fruitType;
  fruit.className = "fruit";
  fruit.style.left = Math.random() * (window.innerWidth - 60) + "px";
  fruit.style.top = "-60px";

  fruit.dataset.type = fruitType; // 🍌 or 💣

  gameArea.appendChild(fruit);

  setTimeout(() => {
    fruit.style.top = "500px";
  }, 100);

  setTimeout(() => {
    if (document.body.contains(fruit)) fruit.remove();
  }, 4000);
}

// ✋ Touch swipe detection
gameArea.addEventListener("touchmove", function (e) {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  const fruits = document.querySelectorAll(".fruit");
  fruits.forEach(fruit => {
    const rect = fruit.getBoundingClientRect();

    if (
      x > rect.left &&
      x < rect.right &&
      y > rect.top &&
      y < rect.bottom &&
      !fruit.classList.contains("cut")
    ) {
      // ✅ Add cut animation
      fruit.classList.add("cut");

      if (fruit.dataset.type.includes("bomb")) {
        // 💣 Bomb logic
        bombSound.play();
        score = Math.max(0, score - 5);
      } else {
        // 🍎 Fruit logic
        cutSound.play();
        score += 1;
      }

      scoreDisplay.textContent = "Score: " + score;
      setTimeout(() => fruit.remove(), 300);
    }
  });
});

// 🎮 Drop fruits every second
setInterval(createFruit, 1000);