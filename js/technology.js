// ============ TECHNOLOGY.JS - DARK MODE TOGGLE ============
const toggle = document.getElementById("toggle");
toggle.onclick = () => document.documentElement.classList.toggle("dark");

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress");
const questionContainer = document.getElementById("question-container");
const totalQuestions = 10;

const questions = [
    { question: "What does CPU stand for?", options: ["A. Central Program Unit", "B. Computer Processing Unit", "C. Central Processing Unit", "D. Core Processing Unit"], correct: 2 },
    { question: "What does HTML stand for?", options: ["A. HyperText Markup Language", "B. High Tech Modern Language", "C. Home Tool Markup Language", "D. Hyper Transfer Markup Language"], correct: 0 },
    { question: "Who is known as the father of computers?", options: ["A. Alan Turing", "B. Charles Babbage", "C. Bill Gates", "D. Steve Jobs"], correct: 1 },
    { question: "What year was the first iPhone released?", options: ["A. 2005", "B. 2006", "C. 2007", "D. 2008"], correct: 2 },
    { question: "What does RAM stand for?", options: ["A. Read Access Memory", "B. Random Access Memory", "C. Run Application Memory", "D. Random Application Module"], correct: 1 },
    { question: "Which company developed the Windows operating system?", options: ["A. Apple", "B. Google", "C. Microsoft", "D. IBM"], correct: 2 },
    { question: "What does URL stand for?", options: ["A. Universal Resource Link", "B. Uniform Resource Locator", "C. Unified Resource Locator", "D. Universal Reference Link"], correct: 1 },
    { question: "What is the name of Google's mobile operating system?", options: ["A. iOS", "B. Windows Phone", "C. Android", "D. BlackBerry OS"], correct: 2 },
    { question: "What does SSL stand for?", options: ["A. Secure System Link", "B. Safe Socket Layer", "C. Secure Sockets Layer", "D. Standard Security Link"], correct: 2 },
    { question: "What programming language shares its name with a precious gem?", options: ["A. Java", "B. Python", "C. Ruby", "D. Perl"], correct: 2 },
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
