const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const SCORES_FILE = path.join(__dirname, 'scores.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function readScores() {
    try {
        if (fs.existsSync(SCORES_FILE)) {
            const data = fs.readFileSync(SCORES_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Erro ao ler scores:', error);
        return [];
    }
}

function writeScores(scores) {
    try {
        fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Erro ao escrever scores:', error);
        return false;
    }
}

app.get('/api/scores', (req, res) => {
    try {
        const scores = readScores();
        // Ordenar: Prioriza Score > Menor Tempo Total
        const sortedScores = scores.sort((a, b) => b.score - a.score || a.time - b.time);
        res.json(sortedScores);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar ranking' });
    }
});

app.post('/api/scores', (req, res) => {
    try {
        const { name, score, time, date } = req.body;

        if (!name || score === undefined || time === undefined) {
            return res.status(400).json({ error: 'Dados incompletos' });
        }

        const scores = readScores();

        const newScore = {
            id: Date.now().toString(),
            name: name.trim(),
            score: parseInt(score),
            time: parseInt(time),
            date: date || new Date().toISOString()
        };

        scores.push(newScore);

        if (writeScores(scores)) {
            res.status(201).json(newScore);
        } else {
            res.status(500).json({ error: 'Erro ao salvar pontuação' });
        }
    } catch (error) {
        console.error('Erro ao salvar score:', error);
        res.status(500).json({ error: 'Erro ao salvar pontuação' });
    }
});

app.delete('/api/scores', (req, res) => {
    try {
        if (writeScores([])) {
            res.json({ message: 'Ranking limpo com sucesso' });
        } else {
            res.status(500).json({ error: 'Erro ao limpar ranking' });
        }
    } catch (error) {
        console.error('Erro ao limpar scores:', error);
        res.status(500).json({ error: 'Erro ao limpar ranking' });
    }
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${3000}`);
    console.log(`API disponível em http://localhost:${3000}/api`);
});