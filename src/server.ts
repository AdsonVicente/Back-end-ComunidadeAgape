import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

// ===============================
// CONFIGURAÇÃO DE AMBIENTE
// ===============================
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não definida.");
  process.exit(1);
}

const app = express();

// ===============================
// SEGURANÇA
// ===============================
app.use(helmet());

// CORS controlado por ambiente
const allowedOrigins = [
  "https://www.comagape.org",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origem não permitida pelo CORS."));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ===============================
// PARSING
// ===============================
app.use(express.json({ limit: "1mb" }));

// ===============================
// LOG BÁSICO DE REQUISIÇÕES
// ===============================
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    message: "Serviço ativo e operando normalmente.",
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// ROTAS
// ===============================
app.use(router);

// ===============================
// 404 PADRÃO
// ===============================
app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    status: "error",
    message: "Recurso solicitado não encontrado.",
  });
});

// ===============================
// ERROS GLOBAIS
// ===============================
app.use(errorHandler);

// ===============================
// INICIALIZAÇÃO
// ===============================
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});