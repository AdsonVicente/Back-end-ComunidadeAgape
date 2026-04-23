import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AdministradoresDetalhesService {
  async execute() {
    const admins = await prisma.administrador.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true
      },
    });

    return admins;
  }
}

export { AdministradoresDetalhesService };
