"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarInscricaoController = void 0;
const CadastrarInscricaoService_1 = require("../../services/inscricao/CadastrarInscricaoService");
CadastrarInscricaoService_1.CriarInscricaoService;
class CriarInscricaoController {
    async handle(req, res) {
        const { nome, email, telefone, idade, grupo, setor, eventoId } = req.body;
        const criarInscricaoService = new CadastrarInscricaoService_1.CriarInscricaoService();
        try {
            const inscricao = await criarInscricaoService.execute({
                nome,
                email,
                telefone,
                idade,
                grupo,
                setor,
                eventoId,
            });
            return res.status(201).json(inscricao);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CriarInscricaoController = CriarInscricaoController;
