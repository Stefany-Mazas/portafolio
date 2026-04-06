// Configuración
const API_URL = "https://4ce959d0b8d4.ngrok-free.app//traducir"; // 
const MAX_TEXT_LENGTH = 500;
const DEBOUNCE_TIME = 1000; // 1 segundo

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

// Estado
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

    // Normalizar valores (quitar acentos y convertir a formato API)
    const normalizeLang = (lang) => {
        return lang === "náhuatl" ? "nahuatl" : lang;
    };

    sourceLang = normalizeLang(sourceLang); // "español" → "español", "náhuatl" → "nahuatl"
    targetLang = normalizeLang(targetLang); // "náhuatl" → "nahuatl"

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

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

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

// Funciones de apoyo
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
    // Intercambiar valores de selects
    [elements.sourceSelect.value, elements.targetSelect.value] = 
    [elements.targetSelect.value, elements.sourceSelect.value];
    
    // Intercambiar textos
    [elements.sourceText.value, elements.translatedText.value] = 
    [elements.translatedText.value, elements.sourceText.value];
    
    showSuccess("Idiomas intercambiados");
}

function handleTextInput() {
    // Actualizar contador
    elements.charCount.textContent = `${elements.sourceText.value.length}/${MAX_TEXT_LENGTH}`;
    
    // Debounce para traducción automática
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (elements.sourceText.value.trim()) translateText();
    }, DEBOUNCE_TIME);
}

// Funciones de UI
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

// Funciones de voz
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
    utterance.lang = elements.sourceSelect.value === "español" ? "es-MX" : "es-MX"; // Ajustar para náhuatl si es necesario
    speechSynthesis.speak(utterance);
}

function listenToSpeech() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = elements.sourceSelect.value === "español" ? "es-MX" : "es-MX";
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

// Funcionalidad extra: Copiar al portapapeles
function copyToClipboard(textElement) {
    textElement.select();
    document.execCommand("copy");
    showSuccess("Texto copiado!");
}

// Inicialización
elements.charCount.textContent = `0/${MAX_TEXT_LENGTH}`;

// Seleccionar elementos de los círculos
const sourceLanguageCircle = document.getElementById("sourceLanguageCircle");
const targetLanguageCircle = document.getElementById("targetLanguageCircle");

// Eventos para los círculos de idioma
sourceLanguageCircle.addEventListener("click", () => {
    elements.sourceSelect.value = "español";
    updateActiveCircles();
});

targetLanguageCircle.addEventListener("click", () => {
    elements.targetSelect.value = "náhuatl";
    updateActiveCircles();
});

// Función para actualizar los círculos activos
function updateActiveCircles() {
    // Remover clase active de todos
    document.querySelectorAll('.language-circle').forEach(circle => {
        circle.classList.remove('active');
    });
    
    // Agregar clase active al círculo correspondiente al idioma origen
    if (elements.sourceSelect.value === "español") {
        sourceLanguageCircle.classList.add('active');
    } else {
        // Aquí podrías agregar lógica para otro círculo si tuvieras más idiomas
    }
    
    // Agregar clase active al círculo correspondiente al idioma destino
    if (elements.targetSelect.value === "náhuatl") {
        targetLanguageCircle.classList.add('active');
    } else {
        // Aquí podrías agregar lógica para otro círculo si tuvieras más idiomas
    }
}

// Llamar al inicio para establecer el estado inicial
updateActiveCircles();
function swapLanguages() {
    updateActiveCircles();
    showSuccess("Idiomas intercambiados");
}
// Actualizar también en la función swapLanguages
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sourceSelect = document.getElementById('sourceLanguage');
    const targetSelect = document.getElementById('targetLanguage');
    const sourceFlag = document.getElementById('sourceLanguageFlag');
    const targetFlag = document.getElementById('targetLanguageFlag');
    const sourceText = document.getElementById('sourceText');
    const translatedText = document.getElementById('translatedText');
    const swapBtn = document.getElementById('change');

    // Rutas de imágenes
    const FLAG_PATHS = {
        'español': 'img/spain-flag.png',
        'náhuatl': 'img/tlahtolli.png'
    };

    // Actualizar displays
    function updateDisplays() {
        // Actualizar imágenes
        sourceFlag.src = FLAG_PATHS[sourceSelect.value];
        targetFlag.src = FLAG_PATHS[targetSelect.value];
        
        // Actualizar clases active
        document.querySelectorAll('.language-circle').forEach(circle => {
            circle.classList.remove('active');
        });
        document.getElementById('sourceLanguageCircle').classList.add('active');
    }

    // Función para intercambiar
    function swapLanguages() {

        // 1. Intercambiar valores
        
        [sourceSelect.value, targetSelect.value] = [targetSelect.value, sourceSelect.value];
        
        // 2. Intercambiar textos (si existen)
        if (sourceText && translatedText) {
            [sourceText.value, translatedText.value] = [translatedText.value, sourceText.value];
        }
        
        // 3. Actualizar displays
        updateDisplays();
        
        // 4. Mostrar mensaje
        showStatus("Idiomas intercambiados", "success");
    }

    // Mostrar estado
    function showStatus(message, type) {
        const statusElement = document.getElementById('statusMessage');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.style.color = type === 'success' ? '#28a745' : '#dc3545';
            setTimeout(() => statusElement.textContent = '', 3000);
        }
    }

    // Event listeners
    sourceSelect.addEventListener('change', updateDisplays);
    targetSelect.addEventListener('change', updateDisplays);
    swapBtn.addEventListener('click', swapLanguages);

    // Inicialización
    updateDisplays();
});