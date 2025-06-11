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
exports.EditarAdministradorController = void 0;
const EditarAdministradorService_1 = require("../../services/administrador/EditarAdministradorService");
class EditarAdministradorController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            const { id } = req.params; // id do administrador a ser editado
            const editarAdministradorService = new EditarAdministradorService_1.EditarAdministradorService();
            const resultado = yield editarAdministradorService.execute({
                id,
                nome,
                email,
                senha
            });
            return res.json({ administrador: resultado });
        });
    }
}
exports.EditarAdministradorController = EditarAdministradorController;
