"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarLiturgiasService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListarLiturgiasService {
    async execute() {
        const liturgias = await prisma.liturgia.findMany({
            orderBy: {
                dia: 'asc'
            }
        });
        return liturgias;
    }
}
exports.ListarLiturgiasService = ListarLiturgiasService;
