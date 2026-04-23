import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CriarEventoController } from "../controllers/evento/CriarEventoController";
import { ListarEventosController } from "../controllers/evento/ListarEventoController";
import { EditarEventoController } from "../controllers/evento/EditarEventoController";
import { DeletarEventoController } from "../controllers/evento/DeletarEventoController";
import { ListarEventoPorIdController } from "../controllers/evento/ListarEventoPorIdController";

const router = Router();
const upload = uploadConfig.upload();

router.post("/evento", isAuthenticated, upload.single("file"), new CriarEventoController().handle);

router.get("/eventos", new ListarEventosController().handle);
router.get("/evento/:id", new ListarEventoPorIdController().handle);

router.put("/eventos/:id", isAuthenticated, upload.single("file"), new EditarEventoController().handle);
router.delete("/eventos/:id", isAuthenticated, new DeletarEventoController().handle);

export default router;