import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ListarEventosService {
    async execute() {
        const eventos = await prisma.evento.findMany({
            orderBy: {
                data: "asc"
            }
        });
        return eventos;
    }
}

export { ListarEventosService };
