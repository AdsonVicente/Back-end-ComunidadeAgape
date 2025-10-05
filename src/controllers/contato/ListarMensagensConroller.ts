import { Request, Response } from "express";
import { ListarMensagensService } from "../../services/contato/ListarMensagensService";

class ListarMensagensController {
    async handle(request: Request, response: Response) {

        const listarMensagensService = new ListarMensagensService();

        const mensagens = await listarMensagensService.execute();

        return response.json(mensagens);
    }
}
export { ListarMensagensController };

