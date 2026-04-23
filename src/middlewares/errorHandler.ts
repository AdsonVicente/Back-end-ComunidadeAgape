import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-errors";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const isDev = process.env.NODE_ENV !== "production";

  // ===============================
  // ERRO CONTROLADO (SUA CLASSE)
  // ===============================
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // ===============================
  // ERROS DO PRISMA
  // ===============================
  if (err.code === "P2002") {
    return res.status(409).json({
      status: "error",
      message: "Registro duplicado.",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      status: "error",
      message: "Registro não encontrado.",
    });
  }

  // ===============================
  // LOG DETALHADO (SOMENTE DEV)
  // ===============================
  if (isDev) {
    console.error("Erro detalhado:", err);
  } else {
    console.error("Erro:", err.message);
  }

  // ===============================
  // ERRO GENÉRICO
  // ===============================
  return res.status(500).json({
    status: "error",
    message: "Erro interno no servidor.",
    ...(isDev && { details: err.message }),
  });
}