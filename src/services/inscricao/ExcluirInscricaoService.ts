import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ExcluirInscricaoService {
    async execute(id: string) {
        const inscricao = await prisma.inscricao.delete({ where: { id } });
        return inscricao;
    }
}

export { ExcluirInscricaoService };
