import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BuscarConteudoPorIdService {
    async execute(id: string) {
        if (!id) {
            throw new Error("ID do conteúdo não foi fornecido.");
        }

        const conteudo = await prisma.conteudo.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!conteudo) {
            throw new Error("Conteúdo não encontrado.");
        }

        return conteudo;
    }
}

export { BuscarConteudoPorIdService };
