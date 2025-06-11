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
const BuscarAdministardorPorIdService_1 = require("../../services/administrador/BuscarAdministardorPorIdService");
class BuscarAdministradorPorIdController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.params.id; // pegar o ID direto da URL
            const buscarAdministradorPorIdService = new BuscarAdministardorPorIdService_1.BuscarAdministradorPorIdService();
            try {
                const user = yield buscarAdministradorPorIdService.execute(user_id);
                if (!user) {
                    return res.status(404).json({ message: "Administrador não encontrado." });
                }
                return res.json(user);
            }
            catch (error) {
                return res.status(400).json({ message: error.message || "Erro ao buscar administrador." });
            }
        });
    }
}
exports.default = BuscarAdministradorPorIdController;
