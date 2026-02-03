// ---------- Game + Music + Gift Box + Surprise Overlay ----------

// -------- Game state --------
let score = 0;

const scoreText = document.getElementById("score");
const gameArea = document.getElementById("game-area");

// -------- Music --------
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isPlaying = false;

// -------- Surprise overlay --------
const overlay = document.getElementById("surprise-overlay");
const closeBtn = document.getElementById("close-surprise");

// Close overlay (button + tap outside)
if (overlay && closeBtn) {
  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden", "true");
    }
  });
}

// -------- Game: floating hearts --------
function createHeart() {
  if (!gameArea) return;

  const heart = document.createElement("div");
  heart.className = "heart";

  const hearts = ["💖", "💗", "💞", "💕"];
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

  const maxLeft = gameArea.clientWidth - 40;
  heart.style.left = Math.max(0, Math.random() * maxLeft) + "px";

  heart.onclick = () => {
    score++;
    if (scoreText) scoreText.innerText = "Hearts: " + score;
    heart.remove();

    // Show full-page surprise overlay at score 4
    if (score >= 4 && overlay) {
      overlay.classList.add("show");
      overlay.setAttribute("aria-hidden", "false");
    }
  };

  gameArea.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

setInterval(createHeart, 900);

// -------- Music: play/pause toggle --------
if (musicBtn && music) {
  musicBtn.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        music.volume = 0.4;
        await music.play();
        musicBtn.innerText = "⏸ Pause music";
        isPlaying = true;
      } else {
        music.pause();
        musicBtn.innerText = "▶ Play music";
        isPlaying = false;
      }
    } catch (e) {
      alert("Tap again to start music 🎶");
      console.error(e);
    }
  });
}

// ---------- Gift box reveal ----------
const giftArea = document.getElementById("gift-area");
const giftBox = document.getElementById("giftbox");
const giftPhotos = document.getElementById("gift-photos");

function toggleGift() {
  if (!giftArea) return;
  giftArea.classList.toggle("open");
  const isOpen = giftArea.classList.contains("open");
  if (giftPhotos) giftPhotos.setAttribute("aria-hidden", String(!isOpen));
}

if (giftBox) {
  giftBox.addEventListener("click", toggleGift);

  // Keyboard support (Enter/Space)
  giftBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleGift();
    }
  });
}
