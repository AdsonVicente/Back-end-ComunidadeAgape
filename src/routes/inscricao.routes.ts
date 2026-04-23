import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CriarInscricaoController } from "../controllers/inscricao/CadastrarInscricaoController";
import { ListarInscricoesController } from "../controllers/inscricao/ListarInscricoesController";
import { EditarInscricaoController } from "../controllers/inscricao/EditarInscricaoController";
import { ExcluirInscricaoController } from "../controllers/inscricao/ExcluirInscricaoController";
import { ListarInscricoesPorEventoController } from "../controllers/inscricao/ListarInscricoesPorEventoController";

const router = Router();

router.post("/inscricoes", new CriarInscricaoController().handle);

router.get("/inscricoes", isAuthenticated, new ListarInscricoesController().handle);
router.get("/inscricoes/evento/:eventoId", isAuthenticated, new ListarInscricoesPorEventoController().handle);

router.put("/inscricoes/:id", isAuthenticated, new EditarInscricaoController().handle);
router.delete("/inscricoes/:id", isAuthenticated, new ExcluirInscricaoController().handle);

export default router;