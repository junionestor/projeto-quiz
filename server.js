import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const SCORES_FILE = path.join(__dirname, 'scores.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

async function readScores() {
    try {
        const data = await fs.readFile(SCORES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Erro ao ler scores:', error);
        }
        return [];
    }
}

async function writeScores(scores) {
    try {
        await fs.writeFile(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Erro ao escrever scores:', error);
        return false;
    }
}

app.get('/api/scores', async (req, res) => {
    try {
        const scores = await readScores();
        const sortedScores = scores.sort((a, b) => b.score - a.score || a.time - b.time);
        res.json(sortedScores);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar ranking' });
    }
});

app.post('/api/scores', async (req, res) => {
    try {
        const { name, score, time, date } = req.body;

        const parsedScore = parseInt(score);
        const parsedTime = parseInt(time);

        if (!name || isNaN(parsedScore) || isNaN(parsedTime)) {
            return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
        }

        const scores = await readScores();

        const newScore = {
            id: Date.now().toString(),
            name: name.trim(),
            score: parsedScore,
            time: parsedTime,
            date: date || new Date().toISOString()
        };

        scores.push(newScore);

        const success = await writeScores(scores);

        if (success) {
            res.status(201).json(newScore);
        } else {
            res.status(500).json({ error: 'Erro ao salvar pontuação' });
        }
    } catch (error) {
        console.error('Erro ao salvar score:', error);
        res.status(500).json({ error: 'Erro ao salvar pontuação' });
    }
});

app.delete('/api/scores', async (req, res) => {
    try {
        const success = await writeScores([]);
        if (success) {
            res.json({ message: 'Ranking limpo com sucesso' });
        } else {
            res.status(500).json({ error: 'Erro ao limpar ranking' });
        }
    } catch (error) {
        console.error('Erro ao limpar scores:', error);
        res.status(500).json({ error: 'Erro ao limpar ranking' });
    }
});

export default app;

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
