import { Request, Response } from "express";
import { BuscarAdministradorPorIdService } from "../../services/administrador/BuscarAdministardorPorIdService";

class BuscarAdministradorPorIdController {
    async handle(req: Request, res: Response) {
        const user_id = req.params.id; // pegar o ID direto da URL


        const buscarAdministradorPorIdService = new BuscarAdministradorPorIdService();

        try {
            const user = await buscarAdministradorPorIdService.execute(user_id);

            if (!user) {
                return res.status(404).json({ message: "Administrador não encontrado." });
            }

            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message || "Erro ao buscar administrador." });
        }
    }
}

export default BuscarAdministradorPorIdController;
