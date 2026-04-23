import { Router } from "express";

import administradorRoutes from "./administrador.routes";
import categoriaRoutes from "./categoria.routes";
import conteudoRoutes from "./conteudo.routes";
import liturgiaRoutes from "./liturgia.routes";
import eventoRoutes from "./evento.routes";
import inscricaoRoutes from "./inscricao.routes";
import contatoRoutes from "./contato.routes";

const router = Router();

router.use(administradorRoutes);
router.use(categoriaRoutes);
router.use(conteudoRoutes);
router.use(liturgiaRoutes);
router.use(eventoRoutes);
router.use(inscricaoRoutes);
router.use(contatoRoutes);

export default router;