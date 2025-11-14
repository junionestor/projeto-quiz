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

