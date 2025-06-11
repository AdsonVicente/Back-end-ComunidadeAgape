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
exports.CriarEventoController = void 0;
const CriarEventoService_1 = require("../../services/evento/CriarEventoService");
class CriarEventoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, descricao, local, data, horario } = req.body;
            if (!req.file || !req.file.path) {
                return res.status(400).json({ error: "Imagem do evento é obrigatória." });
            }
            const banner = req.file.path; // URL da imagem no Cloudinary
            const criarEventoService = new CriarEventoService_1.CriarEventoService();
            try {
                const evento = yield criarEventoService.execute({
                    titulo,
                    descricao,
                    local,
                    data,
                    horario,
                    banner
                });
                return res.status(201).json(evento);
            }
            catch (error) {
                console.error("Erro ao criar evento:", error);
                return res.status(500).json({ error: "Erro interno ao criar evento." });
            }
        });
    }
}
exports.CriarEventoController = CriarEventoController;
