"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarLiturgiaPorIdService = void 0;
const client_1 = require("@prisma/client");
const api_errors_1 = require("../../utils/api-errors");
const prisma = new client_1.PrismaClient();
class BuscarLiturgiaPorIdService {
    async execute(id) {
        const liturgia = await prisma.liturgia.findUnique({ where: { id } });
        if (!liturgia) {
            throw new api_errors_1.NotFoundError('Liturgia não encontrada.');
        }
        return liturgia;
    }
}
exports.BuscarLiturgiaPorIdService = BuscarLiturgiaPorIdService;
