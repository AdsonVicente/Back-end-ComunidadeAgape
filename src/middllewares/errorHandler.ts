import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-errors';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Erro interno no servidor' });
}
