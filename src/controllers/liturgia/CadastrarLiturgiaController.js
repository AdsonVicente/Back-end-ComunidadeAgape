"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarLiturgiaController = void 0;
const CadastrarLiturgiaService_1 = require("../../services/liturgia/CadastrarLiturgiaService");
class CadastrarLiturgiaController {
    async handle(req, res) {
        const { titulo, corLiturgica, primeiraLeitura, salmoResponsorial, segundaLeitura, evangelho, dia } = req.body;
        const service = new CadastrarLiturgiaService_1.CadastrarLiturgiaService();
        try {
            const liturgia = await service.execute({
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: new Date(dia)
            });
            return res.status(201).json(liturgia);
        }
        catch (error) {
            console.error("Erro ao cadastrar liturgia:", error);
            return res.status(500).json({ error: "Erro ao cadastrar liturgia diária." });
        }
    }
}
exports.CadastrarLiturgiaController = CadastrarLiturgiaController;
