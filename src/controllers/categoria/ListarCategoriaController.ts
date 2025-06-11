import { Request, Response } from "express";
import { ListarCategoriaService } from "../../services/categoria/ListarCategoriaService";

class ListarCategoriaController {
    async handle(request: Request, response: Response) {

        const listarCategoriasService = new ListarCategoriaService();

        const categorias = await listarCategoriasService.execute();

        return response.json(categorias);
    }
}
export { ListarCategoriaController };