import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DeletarConteudoService {
    async execute(id: string) {
        await prisma.conteudo.delete({
            where: { id }
        });

        return { mensagem: "Conteúdo deletado com sucesso." };
    }
}

export { DeletarConteudoService };
