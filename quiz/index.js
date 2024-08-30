import { questions } from "./questions.js";

document.addEventListener("DOMContentLoaded", function() {

const question = document.querySelector("#question");
const answerBtns = document.querySelector("#answers");
const nextBtn = document.querySelector("#next");

let score = 0;
let questionNum = 0;

startQuiz();

function startQuiz() {
    score = 0;
    questionNum = 0;
    fillQuestion(questionNum);
}

function fillQuestion(questionNum) {
    // reseting state
    nextBtn.style.display = "none";
    nextBtn.textContent = "next";
    answerBtns.innerHTML = "";

    // filling question
    const currQuestion = questions[questionNum];
    question.textContent = `${questionNum + 1}. ${currQuestion.question}`;

    // filling answers
    currQuestion.answers.forEach(function(answer) {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = answer.text;
        answerBtns.append(btn);
        // cria um campo no elemento para guardar se a resposta está correta
        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", checkOption);
    });
}

function checkOption(event) {
    let option = event.target;
    if (option.dataset.correct) {
        option.classList.add("correct");
        score += 1;
    }
    else {
        option.classList.add("incorrect");
    }
    // mostrando a resposta correta
    Array.from(answerBtns.children).forEach(function(option) {
        if (option.dataset.correct) {
            option.classList.add("correct");
        }
        option.disabled = true;
    })
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", function() {    
    if (++questionNum < questions.length) {
        fillQuestion(questionNum);
    }
    else {
        answerBtns.innerHTML = "";
        question.textContent = `Você acertou ${score} de ${questions.length}!`
        nextBtn.textContent = "Play again";
        questionNum = -1;
    }
});

});