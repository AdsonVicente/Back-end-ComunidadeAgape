import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListarConteudosService {
    async execute() {
        const conteudos = await prisma.conteudo.findMany({
            orderBy: {
                publicadoEm: "desc"
            },
            include: {
                category: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });

        return conteudos;
    }
}

export { ListarConteudosService };
