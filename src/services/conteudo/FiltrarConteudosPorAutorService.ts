import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AutorRequest {
  autor: string;
}

class FiltrarConteudosPorAutorService {
  async execute({ autor }: AutorRequest) {
    const conteudos = await prisma.conteudo.findMany({
      where: {
        autor: autor, // ou: { nome: autor } se for um relacionamento
      },
    });

    return conteudos;
  }
}

export { FiltrarConteudosPorAutorService };
