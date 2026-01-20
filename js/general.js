// ============ GENERAL.JS - DARK MODE TOGGLE ============
const toggle = document.getElementById("toggle");
toggle.onclick = () => document.documentElement.classList.toggle("dark");

// ============ GENERAL.JS - DOM ELEMENTS & CONFIG ============
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress");
const questionContainer = document.getElementById("question-container");
const totalQuestions = 10;

// ============ GENERAL.JS - QUESTIONS DATA ============
const questions = [
    { question: "What is the capital of France?", options: ["A. Paris", "B. London", "C. Berlin", "D. Madrid"], correct: 0 },
    { question: "What planet is closest to the sun?", options: ["A. Mercury", "B. Venus", "C. Earth", "D. Mars"], correct: 0 },
    { question: "How many continents are there?", options: ["A. 5", "B. 6", "C. 7", "D. 8"], correct: 2 },
    { question: "What is the largest ocean on Earth?", options: ["A. Atlantic", "B. Indian", "C. Arctic", "D. Pacific"], correct: 3 },
    { question: "Who wrote Romeo and Juliet?", options: ["A. Charles Dickens", "B. William Shakespeare", "C. Jane Austen", "D. Mark Twain"], correct: 1 },
    { question: "What is the chemical symbol for gold?", options: ["A. Go", "B. Gd", "C. Au", "D. Ag"], correct: 2 },
    { question: "In which year did World War II end?", options: ["A. 1943", "B. 1944", "C. 1945", "D. 1946"], correct: 2 },
    { question: "What is the longest river in the world?", options: ["A. Amazon", "B. Nile", "C. Yangtze", "D. Mississippi"], correct: 1 },
    { question: "How many sides does a hexagon have?", options: ["A. 5", "B. 6", "C. 7", "D. 8"], correct: 1 },
    { question: "What is the capital of Japan?", options: ["A. Seoul", "B. Beijing", "C. Tokyo", "D. Bangkok"], correct: 2 },
];

// --- shuffle: Randomizes question order (Fisher–Yates)
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
shuffle(questions);

// ============ GENERAL.JS - QUIZ STATE & TIMER VARS ============
let currentQuestion = 0;
const userAnswers = {};
const timeRemainingEl = document.getElementById("time-remaining");
const totalTimeSeconds = 600; // 10:00
let timeRemainingSeconds = totalTimeSeconds;
let timerId;

// --- updateProgress: Updates progress bar and question counter
function updateProgress(questionNum) {
    const percent = questionNum * 10;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${questionNum}/${totalQuestions}`;
}

// --- formatTime: Converts seconds to "M:SS" string
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// --- getScore: Count correct answers from userAnswers
function getScore() {
    let correct = 0;
    for (let i = 0; i < totalQuestions; i++) {
        if (userAnswers[i] === questions[i].correct) correct++;
    }
    return correct;
}

// --- showResult: Hide quiz, show message + score + Back to Dashboard (no alert)
function showResult(message) {
    clearInterval(timerId);
    document.getElementById("quiz-content").classList.add("hidden");
    const resultContainer = document.getElementById("result-container");
    const resultMessage = document.getElementById("result-message");
    const resultScore = document.getElementById("result-score");
    resultContainer.classList.remove("hidden");
    resultMessage.innerText = message;
    resultScore.innerText = "Your score: " + getScore() + "/" + totalQuestions;
}

// --- startTimer: Countdown timer, shows result when time runs out
function startTimer() {
    timeRemainingEl.textContent = formatTime(timeRemainingSeconds);
    timerId = setInterval(() => {
        timeRemainingSeconds = Math.max(0, timeRemainingSeconds - 1);
        timeRemainingEl.textContent = formatTime(timeRemainingSeconds);
        if (timeRemainingSeconds <= 0) {
            showResult("Time's up!");
        }
    }, 1000);
}

// ============ GENERAL.JS - BUTTON STYLES ============
const btnClasses = "bg-black text-white dark:bg-gray-100 dark:text-black font-bold w-[20%] rounded-lg py-2 mt-4";

// --- getOptionClasses: Returns CSS classes for option (correct/incorrect/neutral)
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

// --- renderQuestion: Builds HTML for one question, options, and nav buttons
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

// ============ GENERAL.JS - GLOBAL CLICK HANDLER ============
// --- handleClick: Option selection, Next/Previous/Finish navigation
document.addEventListener("click", (e) => {
    const option = e.target.closest(".option");
    if (option && userAnswers[currentQuestion] === undefined) {
        const idx = parseInt(option.dataset.optionIndex, 10);
        userAnswers[currentQuestion] = idx;
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

// ============ GENERAL.JS - INIT ============
renderQuestion(0);
updateProgress(1);
startTimer();
