const quizData = [
    {
        question: "What is HTML?",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        answer: 0
    },
    {
        question: "What is CSS?",
        options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"],
        answer: 0
    },
    {
        question: "What is JavaScript?",
        options: ["A programming language", "A type of coffee", "A scripting language"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const timerEl = document.getElementById('time');
const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const scoreEl = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');
const submitBtn = document.getElementById('submit');

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }
    clearInterval(timerInterval);
    timeLeft = 10; 
    timerEl.textContent = timeLeft;
    startTimer(); 
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = '';
    currentQuiz.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsEl.appendChild(label);
        optionsEl.appendChild(document.createElement('br'));
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption && parseInt(selectedOption.value) === quizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    resultEl.style.display = 'block';
    scoreEl.textContent = score;
    restartBtn.style.display = 'block';
    submitBtn.style.display = 'none';
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    questionEl.style.display = 'block';
    optionsEl.style.display = 'block';
    resultEl.style.display = 'none';
    restartBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    loadQuestion();
});

submitBtn.addEventListener('click', checkAnswer);

window.onload = loadQuestion;

document.addEventListener("DOMContentLoaded", () => {
    const startQuizBtn = document.getElementById("start-quiz");
    const quizContainer = document.getElementById("quiz");
    const submitBtn = document.getElementById("submit");

    // Start Quiz Button Click Event
    startQuizBtn.addEventListener("click", () => {
        startQuizBtn.style.display = "none"; // Hide the Start Quiz button
        quizContainer.style.display = "block"; // Show the quiz container
        submitBtn.style.display = "block"; // Show the Submit button
        startQuiz(); // Initialize the quiz
    });
});

// Function to initialize the quiz
function startQuiz() {
    console.log("Quiz started!");
    // Add your quiz initialization logic here
}