"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CriarAdministradorController_1 = require("./controllers/administrador/CriarAdministradorController");
const AuthAdministradorController_1 = require("./controllers/administrador/AuthAdministradorController");
const AdministradoresDetalhesController_1 = __importDefault(require("./controllers/administrador/AdministradoresDetalhesController"));
const isAuthenticated_1 = require("./middllewares/isAuthenticated");
const CriarCategoriaController_1 = __importDefault(require("./controllers/categoria/CriarCategoriaController"));
const ListarCategoriaController_1 = require("./controllers/categoria/ListarCategoriaController");
const CadastrarConteudoController_1 = require("./controllers/conteudo/CadastrarConteudoController");
const FiltrarConteudoByCategoriaController_1 = require("./controllers/conteudo/FiltrarConteudoByCategoriaController");
const ListarConteudosController_1 = require("./controllers/conteudo/ListarConteudosController");
const CadastrarLiturgiaController_1 = require("./controllers/liturgia/CadastrarLiturgiaController");
const ListarLiturgiasController_1 = require("./controllers/liturgia/ListarLiturgiasController");
const ListarLiturgiaDoDiaController_1 = require("./controllers/liturgia/ListarLiturgiaDoDiaController");
const EditarAdministradorController_1 = require("./controllers/administrador/EditarAdministradorController");
const CriarEventoController_1 = require("./controllers/evento/CriarEventoController");
const ListarEventoController_1 = require("./controllers/evento/ListarEventoController");
const EditarEventoController_1 = require("./controllers/evento/EditarEventoController");
const DeletarEventoController_1 = require("./controllers/evento/DeletarEventoController");
const EditarConteudoController_1 = require("./controllers/conteudo/EditarConteudoController");
const DeletarConteudoController_1 = require("./controllers/conteudo/DeletarConteudoController");
const CadastrarInscricaoController_1 = require("./controllers/inscricao/CadastrarInscricaoController");
const ListarInscricoesController_1 = require("./controllers/inscricao/ListarInscricoesController");
const EditarInscricaoController_1 = require("./controllers/inscricao/EditarInscricaoController");
const ExcluirInscricaoController_1 = require("./controllers/inscricao/ExcluirInscricaoController");
const ListarInscricoesPorEventoController_1 = require("./controllers/inscricao/ListarInscricoesPorEventoController");
// Controllers
const editarConteudo = new EditarConteudoController_1.EditarConteudoController();
const deletarConteudo = new DeletarConteudoController_1.DeletarConteudoController();
const listarEventos = new ListarEventoController_1.ListarEventosController();
const editarEvento = new EditarEventoController_1.EditarEventoController();
const deletarEvento = new DeletarEventoController_1.DeletarEventoController();
const criarInscricaoController = new CadastrarInscricaoController_1.CriarInscricaoController();
const multer_1 = __importDefault(require("./config/multer"));
const BuscarAdministradorPorIdController_1 = __importDefault(require("./controllers/administrador/BuscarAdministradorPorIdController"));
const BuscarConteudoPorIdController_1 = require("./controllers/conteudo/BuscarConteudoPorIdController");
const ExcluirLiturgiaController_1 = require("./controllers/liturgia/ExcluirLiturgiaController");
const ListarEventoPorIdController_1 = require("./controllers/evento/ListarEventoPorIdController");
const CadastrarImagemController_1 = require("./controllers/imagens/CadastrarImagemController");
const client_1 = require("@prisma/client");
const upload = multer_1.default.upload();
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
//ROTAS ADMINISTRADOR
router.post('/administrador', new CriarAdministradorController_1.CriarAdministradorController().handle);
router.post('/login', new AuthAdministradorController_1.AuthAdministradorController().handle);
router.get('/administradoresDetalhes', isAuthenticated_1.isAuthenticated, new AdministradoresDetalhesController_1.default().handle);
router.put("/administrador/:id", isAuthenticated_1.isAuthenticated, new EditarAdministradorController_1.EditarAdministradorController().handle);
router.get("/administrador/:id", new BuscarAdministradorPorIdController_1.default().handle);
//ROTAS CATEGORIA
router.post('/categoria', isAuthenticated_1.isAuthenticated, new CriarCategoriaController_1.default().handle);
router.get('/categorias', new ListarCategoriaController_1.ListarCategoriaController().handle);
//ROTAS CONTEUDOS
// router.post('/conteudo', isAuthenticated, upload.single('file'), new CadastrarConteudoController().handle);
router.post('/conteudo', isAuthenticated_1.isAuthenticated, upload.single('file'), new CadastrarConteudoController_1.CadastrarConteudoController().handle);
router.get('/filtrarConteudos', new FiltrarConteudoByCategoriaController_1.FiltrarConteudoByCategoriaController().handle);
router.get("/conteudos", new ListarConteudosController_1.ListarConteudosController().handle);
router.put("/conteudos/:id", isAuthenticated_1.isAuthenticated, upload.single("file"), editarConteudo.handle);
router.delete("/conteudos/:id", isAuthenticated_1.isAuthenticated, deletarConteudo.handle);
const buscarConteudoPorIdController = new BuscarConteudoPorIdController_1.BuscarConteudoPorIdController();
router.get("/conteudos/:id", buscarConteudoPorIdController.handle);
//rotas liturgia
router.post("/liturgia", isAuthenticated_1.isAuthenticated, new CadastrarLiturgiaController_1.CadastrarLiturgiaController().handle);
router.get("/liturgias", new ListarLiturgiasController_1.ListarLiturgiasController().handle);
router.get("/liturgia-dia", new ListarLiturgiaDoDiaController_1.ListarLiturgiaDoDiaController().handle);
router.delete('/liturgia/:id', isAuthenticated_1.isAuthenticated, new ExcluirLiturgiaController_1.ExcluirLiturgiaController().handle);
//EVENTOS   
router.post('/evento', isAuthenticated_1.isAuthenticated, upload.single('file'), new CriarEventoController_1.CriarEventoController().handle);
router.get("/evento/:id", isAuthenticated_1.isAuthenticated, new ListarEventoPorIdController_1.ListarEventoPorIdController().handle);
router.get("/eventos", listarEventos.handle);
router.put("/eventos/:id", isAuthenticated_1.isAuthenticated, upload.single("file"), editarEvento.handle);
router.delete("/eventos/:id", isAuthenticated_1.isAuthenticated, deletarEvento.handle);
//INSCRIÇÕES PARA OS EVENTOS
router.post("/imagem", isAuthenticated_1.isAuthenticated, upload.single("file"), new CadastrarImagemController_1.CadastrarImagemController().handle);
router.get("/imagens", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imagens = yield prisma.imagem.findMany({
            orderBy: { criadoEm: "desc" },
            include: { autor: { select: { nome: true } } }
        });
        res.json(imagens);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao listar imagens." });
    }
}));
router.get("/inscricoes", new ListarInscricoesController_1.ListarInscricoesController().handle);
router.post("/inscricoes", isAuthenticated_1.isAuthenticated, new CadastrarInscricaoController_1.CriarInscricaoController().handle);
router.put("/inscricoes/:id", isAuthenticated_1.isAuthenticated, new EditarInscricaoController_1.EditarInscricaoController().handle);
router.delete("/inscricoes/:id", isAuthenticated_1.isAuthenticated, new ExcluirInscricaoController_1.ExcluirInscricaoController().handle);
router.get("/inscricoes/evento/:eventoId", isAuthenticated_1.isAuthenticated, new ListarInscricoesPorEventoController_1.ListarInscricoesPorEventoController().handle);
exports.default = router;
