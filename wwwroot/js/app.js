// Base de datos de palabras por secciones
const secciones = {
  "seccion1": [
    {"español": "agua", "nahuatl": "atl"},
    {"español": "casa", "nahuatl": "kali"},
    {"español": "sol", "nahuatl": "tonatiuh"}
  ],
  "seccion2": [
    {"español": "luna", "nahuatl": "metztli"},
    {"español": "libro", "nahuatl": "amoxtli"},
    {"español": "perro", "nahuatl": "itzcuintli"}
  ]
};

let currentSection = "seccion1";
let allQuestions = [];
let currentQuestionIndex = 0;
let lives = 3;
let wrongAnswers = [];

function loadSection(section) {
  allQuestions = [...secciones[section]];
  shuffleArray(allQuestions);
  currentQuestionIndex = 0;
  lives = 3;
  wrongAnswers = [];
  updateHearts();
  mostrarPregunta(allQuestions[0]);
}

function updateHearts() {
  const heartsDiv = document.getElementById("hearts");
  heartsDiv.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    heartsDiv.innerHTML += "❤️ ";
  }
}

function mostrarPregunta(pregunta) {
  const optionsDiv = document.getElementById("options");
  const title = document.getElementById("title");
  const submitButton = document.getElementById("submit");
  const resultado = document.getElementById("result");

  optionsDiv.innerHTML = "";
  resultado.textContent = "";

  title.textContent = `¿Cuál es la traducción de "${pregunta.español}"?`;

  const otras = allQuestions.filter(p => p.nahuatl !== pregunta.nahuatl);
  const distractors = shuffleArray(otras).slice(0, 3);
  const opciones = shuffleArray([pregunta.nahuatl, ...distractors.map(d => d.nahuatl)]);

  opciones.forEach(opcion => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = opcion;

    button.onclick = () => {
      document.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
      submitButton.disabled = false;

      submitButton.onclick = () => {
        if (button.textContent === pregunta.nahuatl) {
          resultado.textContent = "✅ ¡Correcto!";
        } else {
          lives--;
          updateHearts();
          resultado.textContent = `❌ Incorrecto. Era "${pregunta.nahuatl}"`;
          wrongAnswers.push(pregunta);
        }

        setTimeout(() => {
          currentQuestionIndex++;
          if (currentQuestionIndex < allQuestions.length && lives > 0) {
            mostrarPregunta(allQuestions[currentQuestionIndex]);
          } else if (lives <= 0) {
            optionsDiv.innerHTML = "";
            submitButton.style.display = "none";
            title.textContent = "💀 Has perdido todas las vidas.";
          } else {
            // Repaso de errores
            if (wrongAnswers.length > 0) {
              title.textContent = "🔁 Repasemos tus errores...";
              allQuestions = [...wrongAnswers];
              currentQuestionIndex = 0;
              mostrarPregunta(allQuestions[currentQuestionIndex]);
            } else {
              title.textContent = "🎉 ¡Has terminado la sección!";
              submitButton.style.display = "none";
              setTimeout(() => {
                window.location.href = "nah.html"; // Redirección final
              }, 2000);
            }
          }
        }, 1500);
      };
    };

    optionsDiv.appendChild(button);
  });
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Iniciar test
loadSection(currentSection);