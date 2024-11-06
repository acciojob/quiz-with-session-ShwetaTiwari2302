//your JS code here.
const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
  { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], answer: "Harper Lee" }
];

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuiz() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";
  
  questions.forEach((q, index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");
    
    q.options.forEach(option => {
      const optionId = `q${index}-${option}`;
      const isChecked = userAnswers[index] === option;
      
      const optionHTML = `
        <input type="radio" name="question${index}" id="${optionId}" value="${option}" ${isChecked ? "checked" : ""}>
        <label for="${optionId}">${option}</label>
      `;
      
      optionsContainer.insertAdjacentHTML("beforeend", optionHTML);
    });
    
    questionElement.appendChild(optionsContainer);
    quizContainer.appendChild(questionElement);
  });
}

function saveProgress() {
  document.querySelectorAll("input[type='radio']").forEach(input => {
    input.addEventListener("change", () => {
      const [questionIndex, optionValue] = input.id.split("-");

      userAnswers[parseInt(questionIndex.slice(1))] = optionValue;
      sessionStorage.setItem("progress", JSON.stringify(userAnswers));
    });
  });
}

function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  document.getElementById("result").textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

document.getElementById("submit-btn").addEventListener("click", submitQuiz);
renderQuiz();
saveProgress();

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
