// Kullanıcı adı için modal elementlerini seç
const usernameModal = document.getElementById("username-modal");
const usernameInput = document.getElementById("username-input");
const usernameSubmit = document.getElementById("username-submit");
const welcomeMessage = document.getElementById("welcome-message");
const usernameDisplay = document.getElementById("username-display");

// Kullanıcı adı gönderildiğinde
usernameSubmit.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    usernameDisplay.textContent = username;
    welcomeMessage.style.display = "block";
    usernameModal.style.display = "none";
  } else {
    alert("Lütfen bir kullanıcı adı girin.");
  }
});

// Sayfa yüklendiğinde modal göster
window.onload = () => {
  usernameModal.style.display = "flex";
};

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// Farklı işlem sıraları
const stepSets = [
  // İlk işlem seti
  [
    "Tuttuğunuz bir sayıya 5 ekleyin.",
    "Sonucu 2 ile çarpın.",
    "Sonuçtan 4 çıkarın.",
    "Sonucu 2'ye bölün.",
    "Başlangıçta tuttuğunuz sayıyı çıkarın.",
    "Sonucu tahmin et kısmında görün.",
    3  // Sonuç
  ],
  
  // İkinci işlem seti
  [
    "Tuttuğunuz bir sayıyı 2 ile çarpın.",
    "Sonuçtan 10 ekleyin.",
    "Sonucu 2'ye bölün.",
    "Başlangıçta tuttuğunuz sayıyı çıkarın.",
    "Sonucu tahmin et kısmında görün.",
    5  // Sonuç     
  ],

  // Yeni işlem seti
  [
    "Aklınızdan bir sayı tutun.",
    "Bu sayıyı 2 ile çarpın.",
    "Sonuca 20 ekleyin.",
    "Sonucu 2'ye bölün.",
    "Başlangıçta tuttuğunuz sayıyı çıkarın.",
    "Sonucu tahmin et kısmında görün.",
    10  // Sonuç (her zaman 10)
  ]
];

let currentStep = 0;
let currentSteps = [];
let finalResult = 0;

// Elementler
const instruction = document.getElementById("instruction");
const nextStepButton = document.getElementById("next-step");
const calculateButton = document.getElementById("calculate");
const resultDisplay = document.getElementById("result");

// Adımları sıfırlayan fonksiyon
function resetGame() {
  // Rastgele bir işlem seti seç
  const randomSet = stepSets[Math.floor(Math.random() * stepSets.length)];
  currentSteps = randomSet.slice(0, -1);  // Adımlar
  finalResult = randomSet[randomSet.length - 1];  // Sonuç
  currentStep = 0;

  instruction.textContent = currentSteps[0];
  nextStepButton.style.display = "block";
  calculateButton.style.display = "none"; // Başlangıçta gösterme
  resultDisplay.textContent = "";
}

// Sonraki adım
nextStepButton.addEventListener("click", () => {
  if (currentStep < currentSteps.length - 1) {
    instruction.textContent = currentSteps[currentStep];
    currentStep++;
    if (currentStep === currentSteps.length - 1) {
      nextStepButton.style.display = "none";  // Son adımda "Sonraki Adım" butonunu gizle
      calculateButton.style.display = "block";  // Tahmin et butonunu göster
    }
  }
});

// Konfeti efekti için canvas
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

function createConfetti() {
  confettiCanvas.style.display = "block";
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  let particles = [];
  let colors = ["#ff0000", "#ff7300", "#fffb00", "#48ff00", "#00ffd5", "#002bff", "#ff00c8"];

  function generateParticle() {
    let size = Math.random() * 10 + 5;
    let x = Math.random() * confettiCanvas.width;
    let y = Math.random() * confettiCanvas.height;
    let speed = Math.random() * 3 + 2;
    let angle = Math.random() * Math.PI * 2;
    let color = colors[Math.floor(Math.random() * colors.length)];

    particles.push({ x, y, size, speed, angle, color });
  }

  function updateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.speed * Math.cos(p.angle);
      p.y += p.speed * Math.sin(p.angle);
      p.size *= 0.99; // Shrink particles
      if (p.size < 1) particles.splice(i, 1);
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    if (particles.length > 0) {
      requestAnimationFrame(updateConfetti);
    } else {
      confettiCanvas.style.display = "none";
    }
  }

  // Generate initial confetti particles
  for (let i = 0; i < 200; i++) {
    generateParticle();
  }

  updateConfetti();
}

// Hesaplama butonuna tıklanınca konfeti göster
calculateButton.addEventListener("click", () => {
  resultDisplay.textContent = `Tahmin edilen sonuç: ${finalResult} 🎉`;
  createConfetti();  // Konfeti efekti başlat

  setTimeout(() => {
    // Oyun tekrarını başlatmadan önce farklı işlemler ile yeniden başlatma
    const playAgain = confirm("Tekrar oynamak ister misiniz?");
    if (playAgain) {
      resetGame();
    }
  }, 2000);
});

// Oyunu sıfırla
resetGame();
