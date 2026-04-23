import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import CriarCategoriaController from "../controllers/categoria/CriarCategoriaController";
import { ListarCategoriaController } from "../controllers/categoria/ListarCategoriaController";

const router = Router();

router.post("/categoria", isAuthenticated, new CriarCategoriaController().handle);
router.get("/categorias", new ListarCategoriaController().handle);

export default router;