let score = 0;

const scoreText = document.getElementById("score");
const gameArea = document.getElementById("game-area");
const surprise = document.getElementById("surprise");

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isPlaying = false;

// -------- Game: floating hearts --------
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";

  // Position relative to game area width (better on mobile)
  const maxLeft = gameArea.clientWidth - 40;
  heart.style.left = Math.max(0, Math.random() * maxLeft) + "px";

  heart.onclick = () => {
    score++;
    scoreText.innerText = "Hearts: " + score;
    heart.remove();

    if (score >= 8) {
      surprise.style.display = "block";
    }
  };

  gameArea.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

setInterval(createHeart, 900);

// -------- Music: play/pause toggle --------
musicBtn.addEventListener("click", async () => {
  try {
    if (!isPlaying) {
      music.volume = 0.4;
      await music.play(); // await helps catch mobile play errors
      musicBtn.innerText = "⏸ Pause music";
      isPlaying = true;
    } else {
      music.pause();
      musicBtn.innerText = "▶ Play music";
      isPlaying = false;
    }
  } catch (e) {
    // If browser blocks, user may need to tap again
    alert("Tap again to start music 🎶");
    console.error(e);
  }
});
