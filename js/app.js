let questions = [];
let currentQuestionIndex = 0;
let totalScore = 0;
let playerName = "";
let questionActive = false;
let questionStartTime;
let totalTimeTaken = 0;

// Detecta automaticamente o base URL da API baseado no ambiente
function getApiBaseUrl() {
    const host = window.location.hostname;
    const port = window.location.port;
    const protocol = window.location.protocol;

    if (host.includes('netlify.app')) {
        if (port) {
            return `${protocol}//${host}:${port}/api`;
        }
        return `${protocol}//${host}/api`;
    }

    return '/api';
}

const API_BASE_URL = getApiBaseUrl();

async function startQuiz() {
    playerName = document.getElementById("playerName").value.trim();
    if (playerName === "") {
        alert("Por favor, digite seu nome.");
        return;
    }

    // Escolher perguntas aleatórias
    questions = getRandomQuestions(allQuestions, 12);

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "block";
    showQuestion();
}

function getRandomQuestions(sourceQuestions, count) {
    const pool = [...sourceQuestions];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, pool.length));
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    questionActive = true;
    questionStartTime = new Date(); // Inicia a contagem de tempo para a pergunta atual

    const q = questions[currentQuestionIndex];
    const container = document.getElementById("questionContainer");

    document.getElementById("progress").textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;

    // Gerar botões de opção
    container.innerHTML = `
        <div class="question">
            <h3>${q.question}</h3>
        </div>
        <div class="options">
            ${q.options.map((opt, i) =>
        `<button class="option-button" data-index="${i}" onclick="selectOption(${i}, this)">${opt}</button>`
    ).join("")}
        </div>
    `;

    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").classList.remove("show", "correct", "incorrect");
}

function selectOption(selectedIndex, buttonElement) {
    if (!questionActive) return; // Não permite cliques após a resposta

    questionActive = false; // Desativa a questão após a primeira seleção

    // Calcula o tempo de resposta em segundos
    const timeTakenMs = new Date() - questionStartTime;
    const timeTakenSeconds = Math.round(timeTakenMs / 100) / 10;
    totalTimeTaken += timeTakenMs; // Soma o tempo total

    // Remove a seleção de todos
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = true; // Desabilita após a escolha
    });

    // Adiciona o estilo de seleção
    buttonElement.classList.add('selected');

    handleAnswer(selectedIndex, timeTakenSeconds);
}

function handleAnswer(selectedIndex, timeTakenSeconds) {
    const q = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    const isCorrect = selectedIndex === q.answer;

    feedback.classList.add("show");

    // Revela a resposta correta visualmente (borda verde)
    const correctButton = document.querySelector(`.option-button[data-index="${q.answer}"]`);
    if (correctButton) {
        correctButton.style.border = "4px solid #4CAF50";
        correctButton.style.transform = "scale(1.05)";
    }

    if (isCorrect) {
        // Pontuação por rapidez: Max 1500 pontos, Min 1000
        const timeFactor = Math.max(0, (20 - timeTakenSeconds) / 20);
        const pointsGained = Math.round(q.points + (q.points * timeFactor * 0.5));

        totalScore += pointsGained;
        feedback.textContent = `✅ Correto em ${timeTakenSeconds}s! (+${pointsGained} pontos)`;
        feedback.classList.add("correct");
    } else {
        feedback.textContent = `❌ Incorreto em ${timeTakenSeconds}s.`;
        feedback.classList.add("incorrect");

        // Marca o botão selecionado incorretamente com borda vermelha
        const selectedButton = document.querySelector(`.option-button[data-index="${selectedIndex}"]`);
        if (selectedButton && selectedButton !== correctButton) {
            selectedButton.style.border = "4px solid #F44336";
        }
    }

    // Pausa antes de ir para a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 3000); // 3 segundos de feedback
}

async function endQuiz() {
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "block";

    const totalTimeSeconds = Math.round(totalTimeTaken / 1000);
    let scoreMessage = `${playerName}, seu score final foi de ${totalScore} pontos. Seu tempo total foi de ${totalTimeSeconds} segundos.`;

    // Salvar pontuação no backend
    try {
        const result = await saveScore(playerName, totalScore, totalTimeSeconds);
        if (result && result.updated) {
            scoreMessage += `\n\n🔄 Seu score anterior (${result.previousScore} pontos) foi substituído pelo novo score maior!`;
        } else if (result && result.message) {
            scoreMessage += `\n\nℹ️ ${result.message}`;
        }
    } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
    }

    document.getElementById("finalScore").textContent = scoreMessage;

    // Carregar e exibir ranking global
    await loadGlobalRanking();
}

// Função para salvar pontuação no backend
async function saveScore(name, score, time) {
    try {
        const response = await fetch(`${API_BASE_URL}/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                score: score,
                time: time,
                date: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar pontuação');
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
        throw error;
    }
}

// Função para carregar ranking global do backend
async function loadGlobalRanking() {
    try {
        const response = await fetch(`${API_BASE_URL}/scores`);
        if (!response.ok) {
            throw new Error('Erro ao carregar ranking');
        }

        const ranking = await response.json();
        updateRankingDisplay(ranking);
    } catch (error) {
        console.error("Erro ao carregar ranking:", error);
        document.getElementById("rankingList").innerHTML = "<li>Erro ao carregar ranking. Verifique se o servidor está rodando.</li>";
    }
}

// Função para atualizar a lista do ranking na tela
function updateRankingDisplay(ranking) {
    const rankingList = document.getElementById("rankingList");
    if (ranking && ranking.length > 0) {
        // Ordenar: Prioriza Score > Menor Tempo Total
        const sortedRanking = [...ranking].sort((a, b) => b.score - a.score || a.time - b.time);

        rankingList.innerHTML = sortedRanking.map((r, index) =>
            `<li ${index < 3 ? 'style="font-size: 1.2em; font-weight: bold; border-left-color: gold;"' : ''}>
                ${index + 1}º. ${r.name} - ${r.score} pontos (${r.time}s)
            </li>`
        ).join("");
    } else {
        rankingList.innerHTML = "<li>Ninguém jogou ainda! Seja o primeiro!</li>";
    }
}

// Função para limpar o ranking
async function clearRanking() {
    if (confirm("Tem certeza que deseja limpar o Ranking? Esta ação não pode ser desfeita.")) {
        try {
            const response = await fetch(`${API_BASE_URL}/scores`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao limpar ranking');
            }

            updateRankingDisplay([]);
            alert("Ranking limpo com sucesso!");
        } catch (error) {
            console.error("Erro ao limpar ranking:", error);
            alert("Erro ao limpar ranking. Verifique se o servidor está rodando.");
        }
    }
}

// Carregar ranking ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    loadGlobalRanking();
});
