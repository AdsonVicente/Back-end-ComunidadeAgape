import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListarConteudosService {
    async execute() {
        try {
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
        } catch (error) {
            console.error("Erro ao listar conteúdos:", error);
            throw new Error("Erro ao listar conteúdos.");
        }
    }

}

export { ListarConteudosService };
