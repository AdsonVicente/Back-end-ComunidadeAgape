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
exports.EditarConteudoController = void 0;
const EditarConteudoService_1 = require("../../services/conteudo/EditarConteudoService");
class EditarConteudoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { titulo, descricao, categoria, autor } = req.body;
                const banner = req.file ? req.file.filename : undefined;
                const editarConteudoService = new EditarConteudoService_1.EditarConteudoService();
                const conteudo = yield editarConteudoService.execute({
                    id,
                    titulo,
                    descricao,
                    categoria,
                    autor,
                    banner
                });
                return res.json(conteudo);
            }
            catch (error) {
                console.error(error);
                return res.status(400).json({ error: "Erro ao atualizar conteúdo", details: error.message });
            }
        });
    }
}
exports.EditarConteudoController = EditarConteudoController;
