import PrismaClient from "@prisma/client";

interface CategoriaRequest {
    nome: string;
}
const prisma = new PrismaClient.PrismaClient();


export default class CriarCategoriaService {
    async execute({ nome }: CategoriaRequest) {
        if (!nome) {
            throw new Error("Nome da categoria é obrigatório");
        }

        const categoria = await prisma.categoria.create({
            data: {
                id: crypto.randomUUID(),
                nome
            },
            select: {
                id: true,
                nome: true,

            }
        })
        return categoria;
    }
}
export { CriarCategoriaService };
