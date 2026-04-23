// src/services/contato/email.service.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ContatoRequest {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  telefone: string;
}

export class CadastrarContatoService {
  async execute({ nome, email, assunto, mensagem, telefone }: ContatoRequest) {
    if (!nome || !email || !assunto || !mensagem || !telefone) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    const contato = await prisma.contato.create({
      data: {
        nome,
        email,
        assunto,
        mensagem,
        telefone
      },
    });

    return contato;
  }
}
