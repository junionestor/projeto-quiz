import path from 'path';
import { getProjectRoot } from '../utils/pathUtils.mjs';

class HomeController {
    constructor() {
        this.projectRoot = getProjectRoot();
    }

    getIndex(req, res) {
        try {
            const indexPath = path.join(this.projectRoot, 'index.html');
            res.sendFile(indexPath);
        } catch (error) {
            console.error('Erro ao servir index.html:', error);
            res.status(500).send('Erro ao carregar página inicial');
        }
    }

    getRanking(req, res) {
        try {
            const rankingPath = path.join(this.projectRoot, 'ranking.html');
            res.sendFile(rankingPath);
        } catch (error) {
            console.error('Erro ao servir ranking.html:', error);
            res.status(500).send('Erro ao carregar página de ranking');
        }
    }
}

export default HomeController;

