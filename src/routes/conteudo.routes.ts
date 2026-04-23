import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CadastrarConteudoController } from "../controllers/conteudo/CadastrarConteudoController";
import { FiltrarConteudoByCategoriaController } from "../controllers/conteudo/FiltrarConteudoByCategoriaController";
import { ListarConteudosController } from "../controllers/conteudo/ListarConteudosController";
import { EditarConteudoController } from "../controllers/conteudo/EditarConteudoController";
import { DeletarConteudoController } from "../controllers/conteudo/DeletarConteudoController";
import { BuscarConteudoPorIdController } from "../controllers/conteudo/BuscarConteudoPorIdController";
import { FiltrarConteudosPorAutorController } from "../controllers/conteudo/FiltrarConteudosPorAutorController";

const router = Router();
const upload = uploadConfig.upload();

router.post("/conteudo", isAuthenticated, upload.single("file"), new CadastrarConteudoController().handle);

router.get("/conteudos", new ListarConteudosController().handle);
router.get("/conteudos/:id", new BuscarConteudoPorIdController().handle);

router.get("/filtrarConteudos", new FiltrarConteudoByCategoriaController().handle);
router.get("/conteudosadm", new FiltrarConteudosPorAutorController().handle);

router.put("/conteudos/:id", isAuthenticated, upload.single("file"), new EditarConteudoController().handle);
router.delete("/conteudos/:id", isAuthenticated, new DeletarConteudoController().handle);

export default router;