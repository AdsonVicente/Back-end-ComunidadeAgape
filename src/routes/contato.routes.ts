import { Router } from "express";

import { CadastrarContatoController } from "../controllers/contato/email.controller";
import { ListarMensagensController } from "../controllers/contato/ListarMensagensConroller";
import { DeletarContatoController } from "../controllers/contato/DeletarContatoController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.post("/contato", new CadastrarContatoController().handle);

router.get("/mensagens", isAuthenticated, new ListarMensagensController().handle);
router.delete("/mensagens/:id", isAuthenticated, new DeletarContatoController().handle);

export default router;