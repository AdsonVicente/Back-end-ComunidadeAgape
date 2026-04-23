import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

interface CategoriaRequest {
  nome: string;
}

const prisma = new PrismaClient();

class CriarCategoriaService {
  async execute({ nome }: CategoriaRequest) {

    // ===============================
    // 1. VALIDAÇÃO
    // ===============================
    if (!nome || nome.trim().length < 2) {
      throw new Error("Nome da categoria inválido.");
    }

    // normalização (evita duplicidade tipo "Liturgia" vs "liturgia")
    const nomeNormalizado = nome.trim().toLowerCase();

    // ===============================
    // 2. VERIFICAR DUPLICIDADE
    // ===============================
    const existente = await prisma.categoria.findFirst({
      where: {
        nome: nomeNormalizado,
      },
    });

    if (existente) {
      throw new Error("Categoria já cadastrada.");
    }

    // ===============================
    // 3. CRIAÇÃO SEGURA
    // ===============================
    try {
      const categoria = await prisma.categoria.create({
        data: {
          id: crypto.randomUUID(),
          nome: nomeNormalizado,
        },
        select: {
          id: true,
          nome: true,
        },
      });

      return categoria;

    } catch (error: any) {

      // caso exista constraint UNIQUE no banco
      if (error.code === "P2002") {
        throw new Error("Categoria já existe.");
      }

      throw new Error("Erro ao criar categoria.");
    }
  }
}

export { CriarCategoriaService };