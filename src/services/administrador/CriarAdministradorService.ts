
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();


interface UserRequest {
    nome: string;
    email: string;
    senha: string;
}

class CriarAdministradorService {
    async execute({ nome, email, senha }: UserRequest) {

        if (!email) {
            throw new Error("Email é obrigatorio");
        }

        const userAlreadyExists = await prisma.administrador.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado!");
        }

        const passwordHash = await hash(senha, 8);
        if (!passwordHash) {
            throw new Error("Erro ao criar hash da senha");
        }
        const administrador = await prisma.administrador.create({
            data: {
                id: crypto.randomUUID(),
                nome: nome,
                email: email,
                senha: passwordHash,
            }
        });

        return administrador
    }
}
1
export { CriarAdministradorService };