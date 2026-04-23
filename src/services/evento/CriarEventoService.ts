import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";

interface EventoRequest {
  titulo: string;
  descricao: string;
  local: string;
  data: string;
  horario: string;
  banner: string;
}

class CriarEventoService {
  async execute({ titulo, descricao, local, data, horario, banner }: EventoRequest) {
    const evento = await prisma.evento.create({
      data: {
        id: crypto.randomUUID(),
        titulo,
        descricao,
        local,
          data: new Date(data), 
        horario,
        banner,
      }
    });

    return evento;
  }
}

export { CriarEventoService };
