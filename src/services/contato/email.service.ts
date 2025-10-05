import { PrismaClient } from "@prisma/client";

// services/contact/CadastrarContatoService.ts
const prisma = new PrismaClient();

interface ContatoRequest {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export class CadastrarContatoService {
  async execute({ nome, email, assunto, mensagem }: ContatoRequest) {
    // Salva no banco
    const contato = await prisma.contato.create({
      data: {
        nome,
        email,
        assunto,
        mensagem,
      },
    });

    return contato;
  }
}
