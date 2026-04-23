// services/administrador/BuscarAdministradorPorIdService.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class BuscarAdministradorPorIdService {
    async execute(user_id: string) {
        if (!user_id) {
            throw new Error("ID do usuário não fornecido.");
        }

        const user = await prisma.administrador.findUnique({
            where: { id: user_id },
            select: {
                id: true,
                nome: true,
                email: true,
                createdAt: true,
            },
        });

        return user;
    }
}

export { BuscarAdministradorPorIdService };
