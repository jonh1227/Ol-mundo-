let currentQuestion = 0;
let score = 0;
let lastQuestionAnswer = null; // Variável para armazenar a resposta da última pergunta

// Perguntas do questionário
const questions = [
    {
        pergunta: "O que é RDM?",
        opcoes: [
            { texto: "Matar sem motivo", correta: true },
            { texto: "Usar o veículo como arma", correta: false },
            { texto: "Abusar da mecânica do jogo", correta: false }
        ]
    },
    {
        pergunta: "O que é VDM?",
        opcoes: [
            { texto: "Usar o veículo como arma", correta: true },
            { texto: "Matar sem motivo", correta: false },
            { texto: "Deslogar no meio da ação", correta: false }
        ]
    },
    {
        pergunta: "O que é PG?",
        opcoes: [
            { texto: "Abusar da mecânica do jogo, fazendo coisas impossíveis na vida real", correta: true },
            { texto: "Pegar informações de fora do RP", correta: false },
            { texto: "Usar o veículo como arma", correta: false }
        ]
    },
    {
        pergunta: "O que é META-GAMING?",
        opcoes: [
            { texto: "Pegar informações de fora do RP e levar para dentro", correta: true },
            { texto: "Usar o veículo como arma", correta: false },
            { texto: "Matar sem motivo", correta: false }
        ]
    },
    {
        pergunta: "O que é CL?",
        opcoes: [
            { texto: "Deslogar no meio de uma ação para se beneficiar", correta: true },
            { texto: "Usar o veículo como arma", correta: false },
            { texto: "Abusar da mecânica do jogo", correta: false }
        ]
    },
    {
        pergunta: "O que é SURF-RP?",
        opcoes: [
            { texto: "Surf em cima de um veículo em movimento", correta: true },
            { texto: "Usar o veículo como arma", correta: false },
            { texto: "Matar sem motivo", correta: false }
        ]
    },
    {
        pergunta: "O que é DARK-RP?",
        opcoes: [
            { texto: "RP de assédio, estupro, racismo, xenofobia, homofobia", correta: true },
            { texto: "Abusar da mecânica do jogo", correta: false },
            { texto: "Pegar informações de fora do RP", correta: false }
        ]
    },
    {
        pergunta: "Aonde é o lugar da mulher?",
        opcoes: [
            { texto: "É aonde ela quiser", correta: true },
            { texto: "Na cozinha", correta: false },
            { texto: "Na sala", correta: false }
        ]
    }
];

const nickForm = document.getElementById("nick-form");
const recruitmentContainer = document.getElementById("recruitment-container");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-question");

// Botão para iniciar o recrutamento
document.getElementById("start-recruitment").addEventListener("click", () => {
    const nick = document.getElementById("nick").value;
    if (!nick) {
        alert("Por favor, insira seu nick!");
        return;
    }

    recruitmentContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
});

// Embaralhar opções
function shuffleArray(array) {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((item) => item.value);
}

// Exibir uma pergunta
function showQuestion() {
    const question = questions[currentQuestion];
    const shuffledOptions = shuffleArray(question.opcoes);

    questionElement.textContent = question.pergunta;
    optionsElement.innerHTML = ""; // Limpar as opções anteriores

    shuffledOptions.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.texto;
        button.classList.add("option");
        button.addEventListener("click", () => selectAnswer(option.correta, shuffledOptions));
        optionsElement.appendChild(button);
    });

    nextButton.style.display = "none"; // Esconde o botão "Próxima" até a resposta ser dada
}

// Selecionar uma resposta
function selectAnswer(isCorrect, shuffledOptions) {
    const question = questions[currentQuestion];

    if (currentQuestion === questions.length - 1 && !isCorrect) {
        // Se a última pergunta foi errada, interrompe o questionário
        quizContainer.innerHTML = `
            <h2>Descrasificado</h2>
            <p>Você foi descrasificado por responder incorretamente à última pergunta.</p>
        `;
        return; // Interrompe o questionário
    }

    if (isCorrect) {
        score++;
    }

    // Atualiza a cor de fundo dos botões de acordo com a resposta
    Array.from(optionsElement.children).forEach((button, index) => {
        button.disabled = true;
        const option = shuffledOptions[index];
        if (option.correta) {
            button.style.backgroundColor = "green";
        } else {
            button.style.backgroundColor = "red";
        }
    });

    nextButton.style.display = "block"; // Exibe o botão "Próxima"
}

// Passar para a próxima pergunta
nextButton.addEventListener("click", () => {
    currentQuestion++; // Incrementa o índice da pergunta atual
    if (currentQuestion < questions.length) {
        showQuestion(); // Exibe a próxima pergunta
    } else {
        finishRecruitment(); // Ao terminar, chama a função de recrutamento
    }
});

// Finalizar o recrutamento com cargo baseado na pontuação
function finishRecruitment() {
    const nick = document.getElementById("nick").value;
    const cargo = score >= 5 ? "Criar" : "Morador"; // Definindo o cargo com base na pontuação
    const nickFinal = `#ff0000CV | ${nick}`;  // Novo apelido gerado

    // Exibição com as instruções, sem tela de resultados
    quizContainer.innerHTML = `
        <h2>Recrutamento Concluído</h2>

        <div id="cargo-info">
            <p><strong>Cargo Atribuído:</strong> ${cargo}</p>
            <p id="red"><strong>Seu Apelido: #ff0000CV|${nick}</p>
            <p><strong>A bind gerada é:</strong></p>
            <p id="red">bind 0 cv ⌜ ${nick} | ${cargo} ⌟ sᴜʙɪɴᴅᴏ ᴏ ᴄᴏᴍᴘʟᴇxᴏ !!!</p>
        </div>

        <div id="instructions">
            <p><strong>Aviso importante:</strong> A bind é necessária para que você seja identificado corretamente quando entrar na facção. Ela deve ser enviada toda vez que entrar na fac.</p>
        </div>

        <div id="promotion-info">
            <p><strong>Para subir de cargo:</strong></p>
            <p>Você precisa fazer 10 pontos durante a semana. Esses pontos serão contabilizados durante a reunião de sábado, às 19h. 2 pontos devem ser de contação e os outros 8 pontos podem ser de ações e eventos.</p>
            <p><strong>Como fazer contação para ganhar pontos:</strong></p>
            <p>Vá até o canal 『🔎』𝗕𝗔𝗧𝗘-𝗣𝗢𝗡𝗧𝗢 no Discord e digite <code>/ponto</code> para iniciar.</p>
            <p><strong>Importante:</strong> Você pode fazer até 3 pausas de 30 minutos durante a conteção. Para ganhar pontos na contação, o tempo mínimo é de 50 minutos de atividade.</p>
        </div>

        <div id="discord-link">
            <p id="red"><strong>Servidor do Discord:</strong> <a href="https://discord.gg/seulink" target="_blank">Clique aqui</a></p>
        </div>
    `;
}
