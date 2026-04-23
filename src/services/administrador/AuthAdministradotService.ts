import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface AuthRequest {
    email: string;
    senha: string;
}

class AuthAdministradorService {
    async execute({ email, senha }: AuthRequest) {
        const prisma = new PrismaClient();

        if (!email) {
            throw new Error("Email é obrigatório");
        }

        if (!senha) {
            throw new Error("Senha é obrigatória");
        }

        const administrador = await prisma.administrador.findFirst({
            where: {
                email: email
            }
        });

        if (!administrador) {
            throw new Error("Email ou senha incorretos!");
        }

        const senhaMatch = await compare(senha, administrador.senha);

        if (!senhaMatch) {
            throw new Error("Email ou senha incorretos!");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
        }
        const token = sign(
            {
                nome: administrador.nome,
                email: administrador.email,
            },
            process.env.JWT_SECRET as string,
            {
                subject: administrador.id,
                expiresIn: "30d",
            }
        );


        return {
            id: administrador.id,
            nome: administrador.nome,
            email: administrador.email,
            token: token
        }
    }
}

export { AuthAdministradorService };