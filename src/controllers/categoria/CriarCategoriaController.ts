import { Request, Response } from "express";
import CriarCategoriaService from "../../services/categoria/CriarCategoriaService";

class CriarCategoriaController {
    async handle(request: Request, response: Response) {

        const criarCategoriaService = new CriarCategoriaService();
        const { nome } = request.body;

        const categoria = await criarCategoriaService.execute({ nome });

        return response.json(categoria);
    }
}
export default CriarCategoriaController;