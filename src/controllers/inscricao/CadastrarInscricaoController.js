"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarInscricaoController = void 0;
const CadastrarInscricaoService_1 = require("../../services/inscricao/CadastrarInscricaoService");
CadastrarInscricaoService_1.CriarInscricaoService;
class CriarInscricaoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, telefone, idade, grupo, setor, eventoId } = req.body;
            const criarInscricaoService = new CadastrarInscricaoService_1.CriarInscricaoService();
            try {
                const inscricao = yield criarInscricaoService.execute({
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
        });
    }
}
exports.CriarInscricaoController = CriarInscricaoController;
