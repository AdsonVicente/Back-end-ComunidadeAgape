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
exports.EditarEventoController = void 0;
const EditarEventoService_1 = require("../../services/evento/EditarEventoService");
class EditarEventoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { titulo, descricao, local, data, horario } = req.body;
            const banner = req.file ? req.file.filename : undefined;
            const editarEventoService = new EditarEventoService_1.EditarEventoService();
            const evento = yield editarEventoService.execute({
                id,
                titulo,
                descricao,
                local,
                data,
                horario,
                banner
            });
            return res.json(evento);
        });
    }
}
exports.EditarEventoController = EditarEventoController;
