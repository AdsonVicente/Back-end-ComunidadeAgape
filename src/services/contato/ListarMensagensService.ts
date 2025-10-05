import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListarMensagensService {
    async execute() {

        const mensagens = await prisma.contato.findMany({
            select: {
                id: true,
                assunto: true,
                email: true,
                mensagem: true,
            }
        });

        return mensagens;
    }
}

export { ListarMensagensService };
