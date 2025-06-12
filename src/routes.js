"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CriarAdministradorController_1 = require("./controllers/administrador/CriarAdministradorController");
const AuthAdministradorController_1 = require("./controllers/administrador/AuthAdministradorController");
const AdministradoresDetalhesController_1 = __importDefault(require("./controllers/administrador/AdministradoresDetalhesController"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CriarCategoriaController_1 = __importDefault(require("./controllers/categoria/CriarCategoriaController"));
const ListarCategoriaController_1 = require("./controllers/categoria/ListarCategoriaController");
const CadastrarConteudoController_1 = require("./controllers/conteudo/CadastrarConteudoController");
const FiltrarConteudoByCategoriaController_1 = require("./controllers/conteudo/FiltrarConteudoByCategoriaController");
const ListarConteudosController_1 = require("./controllers/conteudo/ListarConteudosController");
const CadastrarLiturgiaController_1 = require("./controllers/liturgia/CadastrarLiturgiaController");
const ListarLiturgiasController_1 = require("./controllers/liturgia/ListarLiturgiasController");
const ListarLiturgiaDoDiaController_1 = require("./controllers/liturgia/ListarLiturgiaDoDiaController");
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
const EstatisticasController_1 = require("./controllers/EstatisticasController");
const EditarLiturgiaController_1 = __importDefault(require("./controllers/liturgia/EditarLiturgiaController"));
const BuscarLiturgiaPorIdController_1 = __importDefault(require("./controllers/liturgia/BuscarLiturgiaPorIdController"));
const EditarAdministradorController_1 = __importDefault(require("./controllers/administrador/EditarAdministradorController"));
const estatisticasController = new EstatisticasController_1.EstatisticasController();
const buscarLiturgiaController = new BuscarLiturgiaPorIdController_1.default();
const editarLiturgiaController = new EditarLiturgiaController_1.default();
const editarAdministradorController = new EditarAdministradorController_1.default();
const upload = multer_1.default.upload();
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
//ROTAS ADMINISTRADOR
router.post('/administrador', new CriarAdministradorController_1.CriarAdministradorController().handle);
router.post('/login', new AuthAdministradorController_1.AuthAdministradorController().handle);
router.get('/administradoresDetalhes', isAuthenticated_1.isAuthenticated, new AdministradoresDetalhesController_1.default().handle);
router.put('/administrador/:id', editarAdministradorController.handle);
router.get("/administrador/:id", isAuthenticated_1.isAuthenticated, new BuscarAdministradorPorIdController_1.default().handle);
router.get("/estatisticas", isAuthenticated_1.isAuthenticated, estatisticasController.handle);
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
// Rotas para o recurso Liturgia
// Criar nova liturgia (requer autenticação)
router.post("/liturgia", isAuthenticated_1.isAuthenticated, new CadastrarLiturgiaController_1.CadastrarLiturgiaController().handle);
// Listar todas as liturgias (pode ser público)
router.get("/liturgias", new ListarLiturgiasController_1.ListarLiturgiasController().handle);
// Listar liturgia do dia (pode ser público)
router.get("/liturgia-dia", new ListarLiturgiaDoDiaController_1.ListarLiturgiaDoDiaController().handle);
// Excluir liturgia por ID (requer autenticação)
router.delete("/liturgia/:id", isAuthenticated_1.isAuthenticated, new ExcluirLiturgiaController_1.ExcluirLiturgiaController().handle);
// Buscar liturgia por ID (pode ser público)
// Ajustando para instanciar o controller como nas outras rotas
router.get("/liturgia/:id", buscarLiturgiaController.handle);
// Editar liturgia por ID (requer autenticação)
// Ajustando para instanciar o controller
router.put("/liturgia/:id", isAuthenticated_1.isAuthenticated, editarLiturgiaController.handle);
//EVENTOS   
router.post('/evento', isAuthenticated_1.isAuthenticated, upload.single('file'), new CriarEventoController_1.CriarEventoController().handle);
router.get("/evento/:id", isAuthenticated_1.isAuthenticated, new ListarEventoPorIdController_1.ListarEventoPorIdController().handle);
router.get("/eventos", listarEventos.handle);
router.put("/eventos/:id", isAuthenticated_1.isAuthenticated, upload.single("file"), editarEvento.handle);
router.delete("/eventos/:id", isAuthenticated_1.isAuthenticated, deletarEvento.handle);
//INSCRIÇÕES PARA OS EVENTOS
router.post("/imagem", isAuthenticated_1.isAuthenticated, upload.single("file"), new CadastrarImagemController_1.CadastrarImagemController().handle);
router.get("/imagens", async (req, res) => {
    try {
        const imagens = await prisma.imagem.findMany({
            orderBy: { criadoEm: "desc" },
            include: { autor: { select: { nome: true } } }
        });
        res.json(imagens);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao listar imagens." });
    }
});
router.get("/inscricoes", new ListarInscricoesController_1.ListarInscricoesController().handle);
router.post("/inscricoes", isAuthenticated_1.isAuthenticated, new CadastrarInscricaoController_1.CriarInscricaoController().handle);
router.put("/inscricoes/:id", isAuthenticated_1.isAuthenticated, new EditarInscricaoController_1.EditarInscricaoController().handle);
router.delete("/inscricoes/:id", isAuthenticated_1.isAuthenticated, new ExcluirInscricaoController_1.ExcluirInscricaoController().handle);
router.get("/inscricoes/evento/:eventoId", isAuthenticated_1.isAuthenticated, new ListarInscricoesPorEventoController_1.ListarInscricoesPorEventoController().handle);
exports.default = router;
