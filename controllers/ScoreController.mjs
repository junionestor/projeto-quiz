import ScoreService from '../services/ScoreService.mjs';

class ScoreController {
    constructor(scoreService) {
        this.scoreService = scoreService;
    }

    getScores(req, res) {
        try {
            const scores = this.scoreService.getAllScores();
            res.json(scores);
        } catch (error) {
            console.error('Erro ao carregar ranking:', error);
            res.status(500).json({ error: 'Erro ao carregar ranking' });
        }
    }

    createScore(req, res) {
        try {
            const { name, score, time, date } = req.body;

            if (!name || score === undefined || time === undefined) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }

            const newScore = this.scoreService.createScore(name, score, time, date);

            if (newScore) {
                res.status(201).json(newScore);
            } else {
                res.status(500).json({ error: 'Erro ao salvar pontuação' });
            }
        } catch (error) {
            console.error('Erro ao salvar score:', error);
            res.status(500).json({ error: 'Erro ao salvar pontuação' });
        }
    }

    deleteScores(req, res) {
        try {
            if (this.scoreService.clearScores()) {
                res.json({ message: 'Ranking limpo com sucesso' });
            } else {
                res.status(500).json({ error: 'Erro ao limpar ranking' });
            }
        } catch (error) {
            console.error('Erro ao limpar scores:', error);
            res.status(500).json({ error: 'Erro ao limpar ranking' });
        }
    }
}

export default ScoreController;

