// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️ Light Mode";
    } else {
        darkModeToggle.textContent = "🌙 Dark Mode";
    }
});

// Adım dizisi
const steps = [
    "Tuttuğunuz bir sayıya 3 ekleyin.",
    "Sonuçtan 2 ile çarpın.",
    "Sonuçtan 4 çıkarın.",
    "Sonucu 2'ye bölün.",
    "Başlangıçta tuttuğunuz sayıyı çıkarın.",
    "Sonucu aşağıdaki kutuya girin ve 'Tahmin Et' düğmesine basın."
];

let currentStep = 0;

// Elementler
const instruction = document.getElementById("instruction");
const nextStepButton = document.getElementById("next-step");
const finalResultInput = document.getElementById("final-result");
const calculateButton = document.getElementById("calculate");
const resultDisplay = document.getElementById("result");

// Adımları sıfırlayan fonksiyon
function resetGame() {
    currentStep = 0;
    instruction.textContent = steps[0];
    nextStepButton.style.display = "block";
    finalResultInput.style.display = "none";
    calculateButton.style.display = "none";
    resultDisplay.textContent = "";
    finalResultInput.value = "";
}

// Sonraki adım
nextStepButton.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
        instruction.textContent = steps[currentStep];
        currentStep++;
        if (currentStep === steps.length - 1) {
            nextStepButton.style.display = "none";
            finalResultInput.style.display = "block";
            calculateButton.style.display = "block";
        }
    }
});

// Hesaplama
calculateButton.addEventListener("click", () => {
    const finalResult = parseInt(finalResultInput.value);
    if (!isNaN(finalResult)) {
        // İşlemlere göre sonuç her zaman 1 olur
        const result = finalResult; // Hesaplama kontrolüne gerek yok
        if (result === 1) {
            resultDisplay.textContent = "Cevabınız 1 mi? 🎉";
        } else {
            resultDisplay.textContent = "Bir hata oldu, lütfen işlemi kontrol edin.";
        }

        // Kullanıcıya tekrar oynamayı sor
        setTimeout(() => {
            const playAgain = confirm("Tekrar oynamak ister misiniz?");
            if (playAgain) {
                resetGame();
            }
        }, 2000);
    } else {
        resultDisplay.textContent = "Lütfen geçerli bir sayı girin.";
    }
});

// Oyunu sıfırla
resetGame();