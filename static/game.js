// ---------- Game + Music + Slider (clean) ----------

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

  const hearts = ["💖", "💗", "💞", "💕"];
  heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

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

// ---------- Photo Slider ----------
const slidesEl = document.getElementById("slides");
const sliderEl = document.getElementById("slider");
const dotsEl = document.getElementById("dots");
const prevBtn = document.querySelector(".nav.prev");
const nextBtn = document.querySelector(".nav.next");

let current = 0;
const total = slidesEl ? slidesEl.children.length : 0;

if (dotsEl && total > 0) {
  for (let i = 0; i < total; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => goTo(i, true));
    dotsEl.appendChild(d);
  }
}

function updateDots() {
  if (!dotsEl) return;
  [...dotsEl.children].forEach((d, i) => d.classList.toggle("active", i === current));
}

function goTo(index, userAction = false) {
  if (!slidesEl) return;
  current = (index + total) % total;
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  if (userAction) resetAuto();
}

if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1, true));
if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1, true));

let startX = 0;
let isDown = false;

if (sliderEl) {
  sliderEl.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
  }, { passive: true });

  sliderEl.addEventListener("touchend", (e) => {
    if (!isDown) return;
    isDown = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 40) {
      if (diff < 0) goTo(current + 1, true);
      else goTo(current - 1, true);
    }
  }, { passive: true });
}

let autoTimer = null;
function startAuto() {
  if (total <= 1) return;
  autoTimer = setInterval(() => goTo(current + 1, false), 3500);
}
function resetAuto() {
  if (autoTimer) clearInterval(autoTimer);
  startAuto();
}
startAuto();
