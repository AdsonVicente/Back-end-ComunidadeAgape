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
exports.ExcluirLiturgiaController = void 0;
const ExcluirLiturgiaService_1 = require("../../services/liturgia/ExcluirLiturgiaService");
class ExcluirLiturgiaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'ID da liturgia é obrigatório' });
            }
            try {
                yield (0, ExcluirLiturgiaService_1.excluirLiturgiaService)(id);
                return res.status(200).json({ message: 'Liturgia excluída com sucesso' });
            }
            catch (error) {
                if (error.message === 'Liturgia não encontrada') {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: 'Erro ao excluir liturgia' });
            }
        });
    }
}
exports.ExcluirLiturgiaController = ExcluirLiturgiaController;
