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
exports.BuscarConteudoPorIdController = void 0;
const BuscarConteudoPorIdService_1 = require("../../services/conteudo/BuscarConteudoPorIdService");
class BuscarConteudoPorIdController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const buscarConteudoPorIdService = new BuscarConteudoPorIdService_1.BuscarConteudoPorIdService();
            try {
                const conteudo = yield buscarConteudoPorIdService.execute(id);
                return res.json(conteudo);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
exports.BuscarConteudoPorIdController = BuscarConteudoPorIdController;
