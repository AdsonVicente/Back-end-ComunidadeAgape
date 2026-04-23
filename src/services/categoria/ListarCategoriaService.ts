import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListarCategoriaService {
    async execute() {

        const categorias = await prisma.categoria.findMany({
            select: {
                id: true,
                nome: true,
            }
        });

        return categorias;
    }
}

export { ListarCategoriaService };