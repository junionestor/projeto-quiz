import fs from 'fs';
import path from 'path';
import { getProjectRoot } from '../utils/pathUtils.mjs';

class ScoreService {
    constructor() {
        const projectRoot = getProjectRoot();
        this.scoresFilePath = path.join(projectRoot, 'scores.json');
    }

    readScores() {
        try {
            if (fs.existsSync(this.scoresFilePath)) {
                const data = fs.readFileSync(this.scoresFilePath, 'utf8');
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            console.error('Erro ao ler scores:', error);
            return [];
        }
    }

    writeScores(scores) {
        try {
            fs.writeFileSync(this.scoresFilePath, JSON.stringify(scores, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Erro ao escrever scores:', error);
            return false;
        }
    }

    getAllScores() {
        const scores = this.readScores();
        // Ordenar: Prioriza Score > Menor Tempo Total
        return scores.sort((a, b) => b.score - a.score || a.time - b.time);
    }

    createScore(name, score, time, date) {
        const scores = this.readScores();
        
        const newScore = {
            id: Date.now().toString(),
            name: name.trim(),
            score: parseInt(score),
            time: parseInt(time),
            date: date || new Date().toISOString()
        };

        scores.push(newScore);

        if (this.writeScores(scores)) {
            return newScore;
        }
        return null;
    }

    clearScores() {
        return this.writeScores([]);
    }
}

export default ScoreService;

