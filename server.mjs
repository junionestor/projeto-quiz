import express from 'express';
import cors from 'cors';
import ScoreService from './services/ScoreService.mjs';
import ScoreController from './controllers/ScoreController.mjs';
import { getProjectRoot } from './utils/pathUtils.mjs';

const app = express();
const PORT = 3000;

// Obtém o diretório raiz do projeto de forma confiável
const __dirname = getProjectRoot();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Inicializa o service e controller
const scoreService = new ScoreService();
const scoreController = new ScoreController(scoreService);

// Rota para servir o index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// Rotas da API
app.get('/api/scores', (req, res) => scoreController.getScores(req, res));
app.post('/api/scores', (req, res) => scoreController.createScore(req, res));
app.delete('/api/scores', (req, res) => scoreController.deleteScores(req, res));

export { app };
export default app;
