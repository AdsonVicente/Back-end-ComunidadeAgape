import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ListarInscricoesPorEventoService {
    async execute(eventId: string) {
        const inscricoes = await prisma.inscricao.findMany({
            where: { eventId },
        });
        return inscricoes;
    }
}

export { ListarInscricoesPorEventoService };
