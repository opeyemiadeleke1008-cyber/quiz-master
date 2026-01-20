// ============ GEOGRAPHY.JS - DARK MODE TOGGLE ============
const toggle = document.getElementById("toggle");
toggle.onclick = () => document.documentElement.classList.toggle("dark");

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress");
const questionContainer = document.getElementById("question-container");
const totalQuestions = 10;

const questions = [
    { question: "What is the capital of Australia?", options: ["A. Sydney", "B. Melbourne", "C. Canberra", "D. Perth"], correct: 2 },
    { question: "What is the longest river in Africa?", options: ["A. Congo", "B. Niger", "C. Nile", "D. Zambezi"], correct: 2 },
    { question: "In which continent is the Sahara Desert located?", options: ["A. Asia", "B. Australia", "C. Africa", "D. South America"], correct: 2 },
    { question: "What is the smallest country in the world?", options: ["A. Monaco", "B. San Marino", "C. Vatican City", "D. Liechtenstein"], correct: 2 },
    { question: "What is the capital of Canada?", options: ["A. Toronto", "B. Vancouver", "C. Ottawa", "D. Montreal"], correct: 2 },
    { question: "Which ocean is the largest?", options: ["A. Atlantic", "B. Indian", "C. Arctic", "D. Pacific"], correct: 3 },
    { question: "What is the highest mountain in the world?", options: ["A. K2", "B. Kilimanjaro", "C. Mount Everest", "D. Denali"], correct: 2 },
    { question: "In which country would you mainly find the Amazon Rainforest?", options: ["A. Peru", "B. Colombia", "C. Brazil", "D. Venezuela"], correct: 2 },
    { question: "What is the capital of Egypt?", options: ["A. Alexandria", "B. Luxor", "C. Cairo", "D. Giza"], correct: 2 },
    { question: "How many time zones does Russia have?", options: ["A. 9", "B. 10", "C. 11", "D. 12"], correct: 2 },
];

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
shuffle(questions);

let currentQuestion = 0;
const userAnswers = {};
const timeRemainingEl = document.getElementById("time-remaining");
const totalTimeSeconds = 600;
let timeRemainingSeconds = totalTimeSeconds;
let timerId;

function updateProgress(questionNum) {
    progressBar.style.width = `${questionNum * 10}%`;
    progressText.textContent = `${questionNum}/${totalQuestions}`;
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function getScore() {
    let correct = 0;
    for (let i = 0; i < totalQuestions; i++) {
        if (userAnswers[i] === questions[i].correct) correct++;
    }
    return correct;
}

function showResult(message) {
    clearInterval(timerId);
    document.getElementById("quiz-content").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");
    document.getElementById("result-message").innerText = message;
    document.getElementById("result-score").innerText = "Your score: " + getScore() + "/" + totalQuestions;
}

function startTimer() {
    timeRemainingEl.textContent = formatTime(timeRemainingSeconds);
    timerId = setInterval(() => {
        timeRemainingSeconds = Math.max(0, timeRemainingSeconds - 1);
        timeRemainingEl.textContent = formatTime(timeRemainingSeconds);
        if (timeRemainingSeconds <= 0) showResult("Time's up!");
    }, 1000);
}

const btnClasses = "bg-black text-white dark:bg-gray-100 dark:text-black font-bold w-[20%] rounded-lg py-2 mt-4";

function getOptionClasses(optionIdx, selected, correctIdx) {
    const base = "border rounded-lg p-3 mb-2 transition font-semibold ";
    const isAnswered = selected !== undefined;
    if (isAnswered) {
        if (optionIdx === correctIdx) return base + "border-green-500 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 cursor-default";
        if (optionIdx === selected) return base + "border-red-500 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 cursor-default";
        return base + "text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-default";
    }
    return base + "text-gray-500 dark:text-gray-300 border-gray-400 dark:border-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-100 dark:hover:text-black";
}

function renderQuestion(index) {
    const q = questions[index];
    const num = index + 1;
    const selected = userAnswers[index];
    const optionsHtml = q.options.map((o, i) => {
        const cls = getOptionClasses(i, selected, q.correct);
        return `<p class="option ${cls}" data-option-index="${i}">${o}</p>`;
    }).join("");

    let buttonsHtml;
    if (index === 0) {
        buttonsHtml = `<div class="flex justify-end"><button class="${btnClasses}" id="next-btn">Next</button></div>`;
    } else if (index === totalQuestions - 1) {
        buttonsHtml = `<div class="flex justify-between"><button class="${btnClasses}" id="previous-btn">Previous</button><button class="${btnClasses}" id="finish-btn">Finish</button></div>`;
    } else {
        buttonsHtml = `<div class="flex justify-between"><button class="${btnClasses}" id="previous-btn">Previous</button><button class="${btnClasses}" id="next-btn">Next</button></div>`;
    }

    questionContainer.innerHTML = `
        <div>
            <div class="flex justify-between items-center">
                <p class="text-gray-500 dark:text-gray-200">Question ${num}</p>
                <p class="text-gray-500 dark:text-gray-200">${num}/${totalQuestions}</p>
            </div>
            <div>
                <p class="text-gray-700 dark:text-gray-200">${q.question}</p>
                <div class="flex flex-col gap-2 mt-6" id="options">${optionsHtml}</div>
            </div>
            ${buttonsHtml}
        </div>
    `;
}

document.addEventListener("click", (e) => {
    const option = e.target.closest(".option");
    if (option && userAnswers[currentQuestion] === undefined) {
        userAnswers[currentQuestion] = parseInt(option.dataset.optionIndex, 10);
        renderQuestion(currentQuestion);
    }
    if (e.target.matches("#next-btn")) {
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            updateProgress(currentQuestion + 1);
            renderQuestion(currentQuestion);
        }
    } else if (e.target.matches("#previous-btn")) {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateProgress(currentQuestion + 1);
            renderQuestion(currentQuestion);
        }
    } else if (e.target.matches("#finish-btn")) {
        showResult("Quiz complete!");
    }
});

renderQuestion(0);
updateProgress(1);
startTimer();
