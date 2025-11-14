import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Inicia o servidor apenas se executado diretamente (não quando importado)
// Em ES modules, verificamos se o módulo foi executado diretamente
// const __filename = fileURLToPath(import.meta.url);
// const __filepath = process.argv[1] ? fileURLToPath(`file://${process.argv[1]}`) : '';

// // Verifica se o arquivo atual é o mesmo que está sendo executado
// if (__filename === __filepath || process.argv[1]?.endsWith('server.mjs')) {
//     app.listen(PORT, () => {
//         console.log(`Servidor rodando em http://localhost:${PORT}`);
//         console.log(`API disponível em http://localhost:${PORT}/api`);
//     });
// }

