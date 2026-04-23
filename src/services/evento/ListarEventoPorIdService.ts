import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ListarEventoPorIdService {
  async execute(id: string) {
    const evento = await prisma.evento.findUnique({
      where: { id },
    });
    return evento;
  }
}


export { ListarEventoPorIdService };
