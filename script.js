const questions = [
    {
        question: "O que significa RDM?",
        options: ["Usar veículo como arma", "Matar sem motivo", "Surf em veículo"],
        correct: 1
    },
    {
        question: "O que significa VDM?",
        options: ["Usar veículo como arma", "Matar sem motivo", "Surf em veículo"],
        correct: 0
    },
    {
        question: "O que significa PG?",
        options: ["Deslogar no meio de uma ação", "Fazer algo impossível na vida real", "Usar informação de fora do RP"],
        correct: 1
    },
    {
        question: "O que significa META-GAMING?",
        options: ["Usar informação de fora do RP", "Fazer algo impossível na vida real", "Deslogar no meio de uma ação"],
        correct: 0
    },
    {
        question: "O que significa CL?",
        options: ["Deslogar no meio de uma ação", "Usar veículo como arma", "Usar informação de fora do RP"],
        correct: 0
    },
    {
        question: "O que significa SURF-RP?",
        options: ["Surf em veículo", "Deslogar no meio de uma ação", "Usar informação de fora do RP"],
        correct: 0
    },
    {
        question: "O que significa DARK-RP?",
        options: ["Racismo ou assédio", "Usar veículo como arma", "Fazer algo impossível na vida real"],
        correct: 0
    },
    {
        question: "Aonde é o lugar da mulher?",
        options: ["Na cozinha", "Lavando roupa", "Onde ela quiser"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

function startQuestions() {
    const nickname = document.getElementById('nickname').value;
    if (nickname) {
        localStorage.setItem("nickname", nickname);
        document.getElementById('initial-box').style.display = 'none';
        document.getElementById('quiz-box').style.display = 'flex';
        showQuestion();
    } else {
        alert("Por favor, digite seu nickname.");
    }
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const option1 = document.getElementById('option-1');
    const option2 = document.getElementById('option-2');
    const option3 = document.getElementById('option-3');

    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    option1.textContent = q.options[0];
    option2.textContent = q.options[1];
    option3.textContent = q.options[2];
}

function answerQuestion(selected) {
    if (selected === questions[currentQuestion].correct) {
        score++;
    } else if (currentQuestion === questions.length - 1 && selected !== 2) {
        alert("Você foi desclassificado.");
        location.reload();
        return;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        const role = score >= 6 ? "Cria" : "Morador";
        localStorage.setItem("role", role);
        window.location.href = "index2.html";
    }
}
