import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DeletarContatoService {
    async execute(id: string) {
        await prisma.contato.delete({
            where: { id }
        });

        return { mensagem: "Contato deletado com sucesso." };
    }
}

export { DeletarContatoService };
