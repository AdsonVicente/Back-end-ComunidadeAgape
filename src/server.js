"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
// Segurança com headers HTTP
app.use((0, helmet_1.default)());
// Permitir apenas domínios específicos no CORS (em produção!)
app.use((0, cors_1.default)({
    origin: ['http://localhost:3333', 'https://comagape.org'], // ajuste conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
// Parsing JSON
app.use(express_1.default.json());
// Uploads com limite de tamanho e segurança
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: path_1.default.resolve(__dirname, '..', 'tmp'),
    createParentPath: true
}));
// Servir arquivos estáticos da pasta tmp
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
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
app.use((err, _req, res, _next) => {
    console.error(err); // opcional: registrar no arquivo de log
    return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor.',
        detail: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
// Inicialização do servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
