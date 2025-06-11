import { Request, Response } from "express";
import { EditarEventoService } from "../../services/evento/EditarEventoService";

class EditarEventoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { titulo, descricao, local, data, horario } = req.body;
        const banner = req.file ? req.file.filename : undefined;

        const editarEventoService = new EditarEventoService();

        const evento = await editarEventoService.execute({
            id,
            titulo,
            descricao,
            local,
            data,
            horario,
            banner
        });

        return res.json(evento);
    }
}

export { EditarEventoController };
