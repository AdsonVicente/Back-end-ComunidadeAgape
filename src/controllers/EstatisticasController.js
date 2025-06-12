"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstatisticasController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EstatisticasController {
    async handle(req, res) {
        try {
            const administradores = await prisma.administrador.count({
                where: { isAdmin: true },
            });
            const eventos = await prisma.evento.count();
            const conteudos = await prisma.conteudo.count();
            return res.json({
                administradores,
                eventos,
                conteudos,
            });
        }
        catch (error) {
            console.error("Erro ao buscar estatísticas:", error);
            return res.status(500).json({ message: "Erro ao buscar estatísticas" });
        }
    }
}
exports.EstatisticasController = EstatisticasController;
