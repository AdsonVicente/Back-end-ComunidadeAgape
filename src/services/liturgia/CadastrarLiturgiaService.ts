import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

interface LiturgiaRequest {
  titulo: string;
  corLiturgica: string;
  primeiraLeitura: string;
  salmoResponsorial: string;
  segundaLeitura?: string;
  evangelho: string;
  dia: Date;
}

const prisma = new PrismaClient();

class CadastrarLiturgiaService {
  async execute({
    titulo,
    corLiturgica,
    primeiraLeitura,
    salmoResponsorial,
    segundaLeitura,
    evangelho,
    dia
  }: LiturgiaRequest) {

    // ===============================
    // 1. VALIDAÇÕES BÁSICAS
    // ===============================
    if (!titulo || titulo.trim().length < 5) {
      throw new Error("Título inválido.");
    }

    if (!corLiturgica) {
      throw new Error("Cor litúrgica obrigatória.");
    }

    if (!primeiraLeitura || primeiraLeitura.replace(/<[^>]*>/g, "").length < 20) {
      throw new Error("Primeira leitura muito curta.");
    }

    if (!salmoResponsorial) {
      throw new Error("Salmo obrigatório.");
    }

    if (!evangelho) {
      throw new Error("Evangelho obrigatório.");
    }

    if (!dia || isNaN(dia.getTime())) {
      throw new Error("Data inválida.");
    }

    // ===============================
    // 2. NORMALIZAÇÃO DA DATA (ANTI-FUSO)
    // ===============================
    const diaNormalizado = new Date(
      dia.toISOString().split("T")[0] + "T00:00:00.000Z"
    );

    // ===============================
    // 3. VERIFICAR DUPLICIDADE
    // ===============================
    const existente = await prisma.liturgia.findFirst({
      where: {
        dia: diaNormalizado,
      },
    });

    if (existente) {
      throw new Error("Já existe uma liturgia cadastrada para este dia.");
    }

    // ===============================
    // 4. CRIAÇÃO SEGURA
    // ===============================
    try {
      const liturgia = await prisma.liturgia.create({
        data: {
          id: crypto.randomUUID(),
          titulo: titulo.trim(),
          corLiturgica: corLiturgica.trim().toLowerCase(),
          primeiraLeitura,
          salmoResponsorial,
          segundaLeitura: segundaLeitura?.trim() ? segundaLeitura : null,
          evangelho,
          dia: diaNormalizado,
        },
      });

      return liturgia;

    } catch (error: any) {

      // erro de duplicidade no banco (caso exista constraint no futuro)
      if (error.code === "P2002") {
        throw new Error("Já existe uma liturgia para este dia.");
      }

      throw new Error("Erro ao cadastrar liturgia.");
    }
  }
}

export { CadastrarLiturgiaService };