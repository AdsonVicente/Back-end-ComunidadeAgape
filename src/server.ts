import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import router from './routes';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Segurança com headers HTTP
app.use(helmet());

// Permitir apenas domínios específicos no CORS (em produção!)
app.use(cors({
    'origin': ['https://www.comagape.org', 'http://localhost:5173','http://localhost:3000'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));


// Parsing JSON
app.use(express.json());


// Rota de verificação
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Servidor está online e operando normalmente.',
        timestamp: new Date().toISOString(),
    });
});


// Rotas da aplicação
app.use(router);

// Rota não encontrada
app.use((_req: Request, res: Response) => {
    return res.status(404).json({
        status: 'error',
        message: 'Rota não encontrada.',
    });
});

// Middleware global de erros
app.use(errorHandler);

// Inicialização do servidor
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
