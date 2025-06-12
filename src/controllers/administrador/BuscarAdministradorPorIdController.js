"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuscarAdministardorPorIdService_1 = require("../../services/administrador/BuscarAdministardorPorIdService");
class BuscarAdministradorPorIdController {
    async handle(req, res) {
        const user_id = req.params.id; // pegar o ID direto da URL
        const buscarAdministradorPorIdService = new BuscarAdministardorPorIdService_1.BuscarAdministradorPorIdService();
        try {
            const user = await buscarAdministradorPorIdService.execute(user_id);
            if (!user) {
                return res.status(404).json({ message: "Administrador não encontrado." });
            }
            return res.json(user);
        }
        catch (error) {
            return res.status(400).json({ message: error.message || "Erro ao buscar administrador." });
        }
    }
}
exports.default = BuscarAdministradorPorIdController;
