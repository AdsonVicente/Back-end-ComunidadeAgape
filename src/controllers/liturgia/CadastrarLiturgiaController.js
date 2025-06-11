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
exports.CadastrarLiturgiaController = void 0;
const CadastrarLiturgiaService_1 = require("../../services/liturgia/CadastrarLiturgiaService");
class CadastrarLiturgiaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, corLiturgica, primeiraLeitura, salmoResponsorial, segundaLeitura, evangelho, dia } = req.body;
            const service = new CadastrarLiturgiaService_1.CadastrarLiturgiaService();
            try {
                const liturgia = yield service.execute({
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
        });
    }
}
exports.CadastrarLiturgiaController = CadastrarLiturgiaController;
