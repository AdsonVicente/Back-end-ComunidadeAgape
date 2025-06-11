import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface ConteudoRequest {
    categoria: string;
}

class FiltrarConteudosByCategoriaService {
    async execute({ categoria }: ConteudoRequest) {

        const conteudos = await prisma.conteudo.findMany({
            where: {
                category: {
                    id: categoria
                }
            },

        });

        return conteudos;
    }
}
export { FiltrarConteudosByCategoriaService };