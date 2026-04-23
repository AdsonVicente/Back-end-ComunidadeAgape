import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CriarAdministradorController } from "../controllers/administrador/CriarAdministradorController";
import { AuthAdministradorController } from "../controllers/administrador/AuthAdministradorController";
import AdministradoresDetalhesController from "../controllers/administrador/AdministradoresDetalhesController";
import BuscarAdministradorPorIdController from "../controllers/administrador/BuscarAdministradorPorIdController";
import EditarAdministradorController from "../controllers/administrador/EditarAdministradorController";
import { EstatisticasController } from "../controllers/EstatisticasController";

const router = Router();

router.post("/administrador", isAuthenticated, new CriarAdministradorController().handle);
router.post("/login", new AuthAdministradorController().handle);

router.get("/administradoresDetalhes", isAuthenticated, new AdministradoresDetalhesController().handle);
router.get("/administrador/:id", isAuthenticated, new BuscarAdministradorPorIdController().handle);

router.put("/administrador/:id", isAuthenticated, new EditarAdministradorController().handle);

router.get("/estatisticas", isAuthenticated, new EstatisticasController().handle);

export default router;