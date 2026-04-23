import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface EditarInscricaoRequest {
    id: string;
    nome?: string;
    email?: string;
    telefone?: string;
    idade?: number;
    grupo?: string;
    setor?: string;
}

class EditarInscricaoService {
    async execute({ id, ...dados }: EditarInscricaoRequest) {
        const inscricaoExistente = await prisma.inscricao.findUnique({ where: { id } });

        if (!inscricaoExistente) {
            throw new Error("Inscrição não encontrada.");
        }

        const inscricao = await prisma.inscricao.update({
            where: { id },
            data: dados,
        });

        return inscricao;
    }
}

export { EditarInscricaoService };
