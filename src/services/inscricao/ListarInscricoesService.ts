import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ListarInscricoesService {
    async execute() {
        const inscricoes = await prisma.inscricao.findMany({
            include: { evento: true }, // para trazer dados do evento, se quiser
        });
        return inscricoes;
    }
}

export { ListarInscricoesService };
