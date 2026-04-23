import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CadastrarLiturgiaController } from "../controllers/liturgia/CadastrarLiturgiaController";
import { ListarLiturgiasController } from "../controllers/liturgia/ListarLiturgiasController";
import { ListarLiturgiaDoDiaController } from "../controllers/liturgia/ListarLiturgiaDoDiaController";
import { ExcluirLiturgiaController } from "../controllers/liturgia/ExcluirLiturgiaController";
import BuscarLiturgiaPorIdController from "../controllers/liturgia/BuscarLiturgiaPorIdController";
import EditarLiturgiaController from "../controllers/liturgia/EditarLiturgiaController";

const router = Router();

const cadastrar = new CadastrarLiturgiaController();
const listar = new ListarLiturgiasController();
const listarDia = new ListarLiturgiaDoDiaController();
const excluir = new ExcluirLiturgiaController();
const buscar = new BuscarLiturgiaPorIdController();
const editar = new EditarLiturgiaController();

// públicas
router.get("/liturgias", listar.handle);
router.get("/liturgia-dia", listarDia.handle);
router.get("/liturgia/:id", buscar.handle);

// protegidas
router.post("/liturgia", isAuthenticated, cadastrar.handle);
router.put("/liturgia/:id", isAuthenticated, editar.handle);
router.delete("/liturgia/:id", isAuthenticated, excluir.handle);

export default router;