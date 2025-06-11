import { PrismaClient } from "@prisma/client";

interface ImagemRequest {
  titulo: string;
  descricao?: string;
  url: string;
  autorId: string;
}

const prisma = new PrismaClient();

class CadastrarImagemService {
  async execute({ titulo, descricao, url, autorId }: ImagemRequest) {
    try {
      const imagem = await prisma.imagem.create({
        data: {
          titulo,
          descricao,
          url,
          autorId,
        },
      });
      return imagem;
    } catch (error) {
      console.error("Erro ao cadastrar imagem:", error);
      throw new Error("Erro ao cadastrar imagem.");
    }
  }
}

export { CadastrarImagemService };
