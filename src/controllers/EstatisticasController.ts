import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class EstatisticasController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const administradores = await prisma.administrador.count({
        where: { isAdmin: true },
      });

      const eventos = await prisma.evento.count();

      const conteudos = await prisma.conteudo.count();

      return res.json({
        administradores,
        eventos,
        conteudos,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      return res.status(500).json({ message: "Erro ao buscar estatísticas" });
    }
  }
}
