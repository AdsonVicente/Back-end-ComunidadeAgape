"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const api_errors_1 = require("../../utils/api-errors");
const prisma = new client_1.PrismaClient();
class LiturgiaService {
    async editarLiturgia(id, data) {
        const liturgia = await prisma.liturgia.findUnique({ where: { id } });
        if (!liturgia) {
            throw new api_errors_1.NotFoundError('Liturgia não encontrada.');
        }
        const usuario = await prisma.administrador.findUnique({ where: { id: data.usuarioId } });
        if (!usuario) {
            throw new api_errors_1.UnauthorizedError('Usuário não encontrado.');
        }
        // Ajuste: permitir apenas admins (ou donos, se liturgia tiver campo administradorId)
        if (!usuario.isAdmin) {
            throw new api_errors_1.UnauthorizedError('Você não tem permissão para editar esta liturgia.');
        }
        // Verifica se ao menos um campo foi enviado
        const camposAtualizar = {
            titulo: data.titulo,
            corLiturgica: data.corLiturgica,
            primeiraLeitura: data.primeiraLeitura,
            salmoResponsorial: data.salmoResponsorial,
            segundaLeitura: data.segundaLeitura,
            evangelho: data.evangelho,
            dia: data.dia,
            atualizadoEm: new Date(),
        };
        // Remove campos indefinidos
        const dadosLimpos = Object.fromEntries(Object.entries(camposAtualizar).filter(([_, valor]) => valor !== undefined));
        if (Object.keys(dadosLimpos).length === 1) {
            // só tem `atualizadoEm`
            throw new api_errors_1.BadRequestError('Nenhum campo fornecido para atualização.');
        }
        const liturgiaAtualizada = await prisma.liturgia.update({
            where: { id },
            data: dadosLimpos,
        });
        return liturgiaAtualizada;
    }
}
exports.default = new LiturgiaService();
