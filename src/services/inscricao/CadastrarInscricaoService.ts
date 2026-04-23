import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

interface InscricaoRequest {
  nome: string;
  email: string;
  telefone: string;
  idade: number;
  grupo: string;
  setor: string;
  eventoId: string;
}

class CriarInscricaoService {
  async execute({ nome, email, telefone, idade, grupo, setor, eventoId }: InscricaoRequest) {
    const evento = await prisma.evento.findUnique({
      where: { id: eventoId },
    });

    if (!evento) {
      throw new Error("Evento não encontrado no sistema.");
    }

    // Verificar se já existe uma inscrição com o mesmo email e evento
    const inscricaoExistente = await prisma.inscricao.findFirst({
      where: {
        email,
         eventId: eventoId,
      },
    });

    if (inscricaoExistente) {
      throw new Error("Você já está inscrito neste evento.");
    }

    const inscricao = await prisma.inscricao.create({
      data: {
        id: crypto.randomUUID(),
        nome,
        email,
        telefone,
        idade,
        grupo,
        setor,
        evento: {
          connect: { id: eventoId },
        },
      },
    });

    return inscricao;
  }
}

export { CriarInscricaoService };
