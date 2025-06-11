import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

interface ConteudoRequest {
  titulo: string;
  descricao: string;
  categoria: string; // id da categoria
  banner?: string; // URL do Cloudinary
  autor: string;
}

const prisma = new PrismaClient();

class CadastrarConteudoService {
  async execute({ titulo, descricao, categoria, banner, autor }: ConteudoRequest) {
    const id = crypto.randomUUID();

    try {
      const conteudo = await prisma.conteudo.create({
        data: {
          id,
          titulo,
          descricao,
          banner,
          autor,
          category: {
            connect: {
              id: categoria
            }
          }
        }
      });

      return conteudo;

    } catch (error) {
      console.error("Erro ao criar conteúdo no Prisma:", error.message);
      console.error(error.stack);
      throw new Error("Erro ao cadastrar conteúdo.");
      
    }
  }
}

export { CadastrarConteudoService };
