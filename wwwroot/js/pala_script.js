let questions = [];
let currentQuestion = 0;
let selectedOption = null;
let score = 0;

// Cargar preguntas desde el HTML
const jsonData = document.getElementById('questions-data').textContent;
questions = JSON.parse(jsonData);

shuffleArray(questions); // Barajar preguntas al inicio
showQuestion();

function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.querySelector('.title').textContent = `¡Juego terminado! Puntos: ${score}/${questions.length}`;
        document.querySelector('.options').innerHTML = "";
        document.getElementById('submit').style.display = "none";
        return;
    }

    const question = questions[currentQuestion];
    document.querySelector('.title').textContent = `¿Cómo se dice "${question.español}" en náhuatl?`;

    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    const correctAnswer = question.nahuatl;
    const options = [correctAnswer];

    while (options.length < 3) {
        const randomOption = questions[Math.floor(Math.random() * questions.length)].nahuatl;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    shuffleArray(options); // Mezclar las opciones

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectOption(button, option);
        optionsContainer.appendChild(button);
    });

    document.getElementById('submit').disabled = true;
}

function selectOption(button, option) {
    document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedOption = option;
    document.getElementById('submit').disabled = false;
}

document.getElementById('submit').addEventListener('click', () => {
    if (!selectedOption) return;

    const correctAnswer = questions[currentQuestion].nahuatl;
    const result = document.getElementById('result');

    if (selectedOption === correctAnswer) {
        result.textContent = "¡Correcto!";
        result.style.color = "green";
        score++;
    } else {
        result.textContent = `Incorrecto. Era: ${correctAnswer}`;
        result.style.color = "red";
    }

    selectedOption = null;
    currentQuestion++;

    setTimeout(() => {
        result.textContent = "";
        showQuestion();
    }, 1500);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
