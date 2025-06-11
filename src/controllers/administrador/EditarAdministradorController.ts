import { Request, Response } from "express";
import { EditarAdministradorService } from "../../services/administrador/EditarAdministradorService";

class EditarAdministradorController {
  async handle(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    const { id } = req.params;

    try {
      const editarAdministradorService = new EditarAdministradorService();

      const resultado = await editarAdministradorService.execute({
        id,
        nome,
        email,
        senha,
      });

      return res.json({ administrador: resultado });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ message: error.message || "Erro ao editar administrador." });
    }
  }
}

export default EditarAdministradorController;
