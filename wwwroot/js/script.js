// Configuración
const API_URL = "https://399fcebd33cb.ngrok-free.app/traducir";
const MAX_TEXT_LENGTH = 500;
const DEBOUNCE_TIME = 1000;

// Elementos del DOM
const elements = {
    sourceSelect: document.getElementById("sourceLanguage"),
    targetSelect: document.getElementById("targetLanguage"),
    modelSelect: document.getElementById("modelSelect"),
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

// Estado
let debounceTimer;

// Función para normalizar idiomas (eliminar tildes)
function normalizeLanguage(lang) {
    return lang.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Event listeners
elements.translateBtn.addEventListener("click", translateText);
elements.swapBtn.addEventListener("click", swapLanguages);
elements.readSourceBtn.addEventListener("click", () => speakText(elements.sourceText.value));
elements.readTranslatedBtn.addEventListener("click", () => speakText(elements.translatedText.value));
elements.listenSourceBtn.addEventListener("click", listenToSpeech);
elements.sourceText.addEventListener("input", handleTextInput);

// Traducción principal
async function translateText() {
    const inputText = elements.sourceText.value.trim();
    let sourceLang = normalizeLanguage(elements.sourceSelect.value);
    let targetLang = normalizeLanguage(elements.targetSelect.value);
    let modelo = elements.modelSelect.value; // <- nuevo dato enviado

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
                destino: targetLang,
                modelo: modelo
            })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            showError(`API Error: ${data.error}`);
            return;
        }

        elements.translatedText.value = data.resultado;
        showSuccess("Traducción exitosa");

    } catch (error) {
        console.error(error);
        showError(`Error de conexión: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

// Validaciones y UI
function validateInput(text) {
    elements.statusMessage.textContent = "";
    if (!text) {
        showError("Por favor ingresa texto para traducir");
        elements.translatedText.value = "";
        return false;
    }
    if (text.length > MAX_TEXT_LENGTH) {
        showError(`Límite de caracteres excedido (máx. ${MAX_TEXT_LENGTH})`);
        return false;
    }
    return true;
}

function handleTextInput() {
    elements.charCount.textContent = `${elements.sourceText.value.length}/${MAX_TEXT_LENGTH}`;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (elements.sourceText.value.trim()) translateText();
    }, DEBOUNCE_TIME);
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

// Intercambiar idiomas
function swapLanguages() {
    [elements.sourceSelect.value, elements.targetSelect.value] = [elements.targetSelect.value, elements.sourceSelect.value];
    [elements.sourceText.value, elements.translatedText.value] = [elements.translatedText.value, elements.sourceText.value];
    updateActiveCircles();
    showSuccess("Idiomas intercambiados");
}

// Voz
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
    utterance.lang = "es-MX";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
}

function listenToSpeech() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "es-MX";
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

// Círculos activos
function updateActiveCircles() {
    document.querySelectorAll('.language-circle').forEach(circle => {
        circle.classList.remove('active');
    });
    if (elements.sourceSelect.value === "español") {
        document.getElementById("sourceLanguageCircle").classList.add('active');
    }
    if (elements.targetSelect.value === "náhuatl") {
        document.getElementById("targetLanguageCircle").classList.add('active');
    }
}

// Inicialización
elements.charCount.textContent = `0/${MAX_TEXT_LENGTH}`;
updateActiveCircles();

document.addEventListener('DOMContentLoaded', function () {
    const sourceSelect = document.getElementById('sourceLanguage');
    const targetSelect = document.getElementById('targetLanguage');
    const sourceFlag = document.getElementById('sourceLanguageFlag');
    const targetFlag = document.getElementById('targetLanguageFlag');

    const FLAG_PATHS = {
        'español': 'img/spain-flag.png',
        'náhuatl': 'img/tlahtolli.png'
    };

    function updateDisplays() {
        sourceFlag.src = FLAG_PATHS[sourceSelect.value];
        targetFlag.src = FLAG_PATHS[targetSelect.value];
        updateActiveCircles();
    }

    sourceSelect.addEventListener('change', updateDisplays);
    targetSelect.addEventListener('change', updateDisplays);
});
