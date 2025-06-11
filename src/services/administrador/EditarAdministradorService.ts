import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface AtualizarAdministradorRequest {
  id: string;
  nome?: string;
  email?: string;
  senha?: string;
}

class EditarAdministradorService {
  async execute({ id, nome, email, senha }: AtualizarAdministradorRequest) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error("ID inválido. Deve ser um UUID.");
    }

    const adminExistente = await prisma.administrador.findUnique({ where: { id } });
    if (!adminExistente) {
      throw new Error("Administrador não encontrado.");
    }

    // Prepara dados para atualização, omitindo undefined
    const dadosParaAtualizar: any = {
      updatedAt: new Date(),
    };

    if (nome !== undefined) dadosParaAtualizar.nome = nome;
    if (email !== undefined) dadosParaAtualizar.email = email;
    if (senha !== undefined) {
      dadosParaAtualizar.senha = await bcrypt.hash(senha, 10);
    }

    const administradorAtualizado = await prisma.administrador.update({
      where: { id },
      data: dadosParaAtualizar,
    });

    return administradorAtualizado;
  }
}

export { EditarAdministradorService };
