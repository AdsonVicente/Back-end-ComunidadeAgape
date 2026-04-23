"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EditarLiturgiaService_1 = __importDefault(require("../../services/liturgia/EditarLiturgiaService"));
const api_errors_1 = require("../../utils/api-errors");
class EditarLiturgiaController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.user_id;
            if (!usuarioId) {
                throw new api_errors_1.BadRequestError('Usuário não autenticado.');
            }
            const { titulo, corLiturgica, primeiraLeitura, salmoResponsorial, segundaLeitura, evangelho, dia } = req.body;
            const diaDate = dia ? new Date(dia) : undefined;
            console.log('Dados recebidos para atualizar liturgia:', {
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: diaDate,
                usuarioId,
            });
            const liturgiaAtualizada = await EditarLiturgiaService_1.default.editarLiturgia(id, {
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: diaDate,
                usuarioId
            });
            return res.status(200).json(liturgiaAtualizada);
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }
}
exports.default = EditarLiturgiaController;
