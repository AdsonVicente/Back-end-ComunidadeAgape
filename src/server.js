"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Carrega variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
// Segurança com headers HTTP
app.use((0, helmet_1.default)());
// Permitir apenas domínios específicos no CORS (em produção!)
app.use((0, cors_1.default)({
    'origin': ['https://comagape.org', 'http://localhost:5173'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
// Parsing JSON
app.use(express_1.default.json());
// Rota de verificação
app.get('/', (_req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Servidor está online e operando normalmente.',
        timestamp: new Date().toISOString(),
    });
});
// Rotas da aplicação
app.use(routes_1.default);
// Rota não encontrada
app.use((_req, res) => {
    return res.status(404).json({
        status: 'error',
        message: 'Rota não encontrada.',
    });
});
// Middleware global de erros
app.use(errorHandler_1.errorHandler);
// Inicialização do servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
