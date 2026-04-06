// Configuración
const API_URL = "https://7bf6ed626429.ngrok-free.app//traducir";  // Reemplaza con TU URL real
const MAX_TEXT_LENGTH = 500;

// Elementos del DOM
const elements = {
    sourceSelect: document.getElementById("sourceLanguage"),
    targetSelect: document.getElementById("targetLanguage"),
    translateBtn: document.getElementById("translateBtn"),
    sourceText: document.getElementById("sourceText"),
    translatedText: document.getElementById("translatedText"),
    swapBtn: document.getElementById("change"),
    readSourceBtn: document.getElementById("readSource"),
    readTranslatedBtn: document.getElementById("readTranslated"),
    listenSourceBtn: document.getElementById("listenSource"),
    loadingSpinner: document.getElementById("loadingSpinner"),
    charCount: document.getElementById("charCount"),
    statusMessage: document.getElementById("statusMessage")
};

let debounceTimer;

// Eventos
elements.translateBtn.addEventListener("click", translateText);
elements.swapBtn.addEventListener("click", swapLanguages);
elements.readSourceBtn.addEventListener("click", () => speakText(elements.sourceText.value));
elements.readTranslatedBtn.addEventListener("click", () => speakText(elements.translatedText.value));
elements.listenSourceBtn.addEventListener("click", listenToSpeech);
elements.sourceText.addEventListener("input", handleTextInput);

// Funciones principales
async function translateText() {
    const inputText = elements.sourceText.value.trim();
    let sourceLang = elements.sourceSelect.value.toLowerCase(); // "español" o "náhuatl"
    let targetLang = elements.targetSelect.value.toLowerCase(); // "náhuatl" o "español"

    // Normalizar valores (quitar acentos)
    const normalizeLang = (lang) => {
        return lang.replace("á", "a").replace("é", "e")
                  .replace("í", "i").replace("ó", "o")
                  .replace("ú", "u");
    };

    sourceLang = normalizeLang(sourceLang);
    targetLang = normalizeLang(targetLang);

    if (!validateInput(inputText)) return;

    try {
        showLoading(true);
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({
                texto: inputText,
                origen: sourceLang,
                destino: targetLang
            })
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const data = await response.json();

        if (data.error) {
            showError(data.error);
            return;
        }

        elements.translatedText.value = data.resultado;
        showSuccess("Traducción exitosa");

    } catch (error) {
        console.error("Error en traducción:", error);
        showError(`Error: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

function validateInput(text) {
    elements.statusMessage.textContent = "";
    if (!text) {
        elements.translatedText.value = "";
        showError("Por favor ingresa texto para traducir");
        return false;
    }
    if (text.length > MAX_TEXT_LENGTH) {
        showError(`Límite de caracteres excedido (máx. ${MAX_TEXT_LENGTH})`);
        return false;
    }
    return true;
}

function swapLanguages() {
    [elements.sourceSelect.value, elements.targetSelect.value] = 
    [elements.targetSelect.value, elements.sourceSelect.value];

    [elements.sourceText.value, elements.translatedText.value] = 
    [elements.translatedText.value, elements.sourceText.value];

    updateActiveCircles();
    showSuccess("Idiomas intercambiados");
}

function handleTextInput() {
    elements.charCount.textContent = `${elements.sourceText.value.length}/${MAX_TEXT_LENGTH}`;
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (elements.sourceText.value.trim()) translateText();
    }, 1000);
}

function showLoading(show) {
    elements.translateBtn.disabled = show;
    elements.loadingSpinner.style.display = show ? "inline-block" : "none";
}

function showError(message) {
    elements.statusMessage.textContent = message;
    elements.statusMessage.style.color = "#dc3545";
    elements.translatedText.value = "❌ Error en la traducción";
}

function showSuccess(message) {
    elements.statusMessage.textContent = message;
    elements.statusMessage.style.color = "#28a745";
    setTimeout(() => elements.statusMessage.textContent = "", 3000);
}

function speakText(text) {
    if (!text) {
        showError("No hay texto para leer");
        return;
    }

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = elements.sourceSelect.value === "espanol" ? "es-MX" : "es-MX";
    speechSynthesis.speak(utterance);
}

function listenToSpeech() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = elements.sourceSelect.value === "espanol" ? "es-MX" : "es-MX";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        elements.sourceText.value = event.results[0][0].transcript;
        translateText();
    };

    recognition.onerror = (event) => {
        console.error("Error en reconocimiento de voz:", event.error);
        showError("Error en reconocimiento de voz");
    };

    recognition.start();
}

function updateActiveCircles() {
    document.querySelectorAll('.language-circle').forEach(circle => circle.classList.remove('active'));

    if (elements.sourceSelect.value === "español") {
        document.getElementById("sourceLanguageCircle").classList.add("active");
    } else if (elements.sourceSelect.value === "nahuatl") {
        document.getElementById("targetLanguageCircle").classList.add("active");
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    elements.charCount.textContent = `0/${MAX_TEXT_LENGTH}`;
    updateActiveCircles();

    elements.sourceSelect.addEventListener('change', updateActiveCircles);
    elements.targetSelect.addEventListener('change', updateActiveCircles);
});