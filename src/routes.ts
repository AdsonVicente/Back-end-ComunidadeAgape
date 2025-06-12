import { Router, RequestHandler } from 'express';
import { CriarAdministradorController } from './controllers/administrador/CriarAdministradorController';
import { AuthAdministradorController } from './controllers/administrador/AuthAdministradorController';
import AdministradoresDetalhesController from './controllers/administrador/AdministradoresDetalhesController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import CriarCategoriaController from './controllers/categoria/CriarCategoriaController';
import { ListarCategoriaController } from './controllers/categoria/ListarCategoriaController';
import { CadastrarConteudoController } from './controllers/conteudo/CadastrarConteudoController';
import { FiltrarConteudoByCategoriaController } from './controllers/conteudo/FiltrarConteudoByCategoriaController';
import { ListarConteudosController } from './controllers/conteudo/ListarConteudosController';
import { CadastrarLiturgiaController } from './controllers/liturgia/CadastrarLiturgiaController';
import { ListarLiturgiasController } from './controllers/liturgia/ListarLiturgiasController';
import { ListarLiturgiaDoDiaController } from './controllers/liturgia/ListarLiturgiaDoDiaController';
import { CriarEventoController } from './controllers/evento/CriarEventoController';
import { ListarEventosController } from './controllers/evento/ListarEventoController';
import { EditarEventoController } from './controllers/evento/EditarEventoController';
import { DeletarEventoController } from './controllers/evento/DeletarEventoController';
import { EditarConteudoController } from './controllers/conteudo/EditarConteudoController';
import { DeletarConteudoController } from './controllers/conteudo/DeletarConteudoController';
import { CriarInscricaoController } from './controllers/inscricao/CadastrarInscricaoController';
import { ListarInscricoesController } from './controllers/inscricao/ListarInscricoesController';
import { EditarInscricaoController } from './controllers/inscricao/EditarInscricaoController';
import { ExcluirInscricaoController } from './controllers/inscricao/ExcluirInscricaoController';
import { ListarInscricoesPorEventoController } from './controllers/inscricao/ListarInscricoesPorEventoController';


// Controllers
const editarConteudo = new EditarConteudoController();
const deletarConteudo = new DeletarConteudoController();
const listarEventos = new ListarEventosController();
const editarEvento = new EditarEventoController();
const deletarEvento = new DeletarEventoController();
const criarInscricaoController = new CriarInscricaoController();
import multer from 'multer';
import uploadConfig from './config/multer';
import BuscarAdministradorPorIdController from './controllers/administrador/BuscarAdministradorPorIdController';
import { BuscarConteudoPorIdController } from './controllers/conteudo/BuscarConteudoPorIdController';
import { ExcluirLiturgiaController } from './controllers/liturgia/ExcluirLiturgiaController';
import { ListarEventoPorIdController } from './controllers/evento/ListarEventoPorIdController';
import { CadastrarImagemController } from './controllers/imagens/CadastrarImagemController';
import { PrismaClient } from '@prisma/client';
import { EstatisticasController } from './controllers/EstatisticasController';
import EditarLiturgiaController from './controllers/liturgia/EditarLiturgiaController';
import BuscarLiturgiaPorIdController from './controllers/liturgia/BuscarLiturgiaPorIdController';
import EditarAdministradorController from './controllers/administrador/EditarAdministradorController';

const estatisticasController = new EstatisticasController();
const buscarLiturgiaController = new BuscarLiturgiaPorIdController();
const editarLiturgiaController = new EditarLiturgiaController();
const editarAdministradorController = new EditarAdministradorController();

const upload = uploadConfig.upload();

const prisma = new PrismaClient();
const router = Router();

//ROTAS ADMINISTRADOR

router.post('/administrador', new CriarAdministradorController().handle);

router.post('/login', new AuthAdministradorController().handle);

router.get('/administradoresDetalhes', isAuthenticated, new AdministradoresDetalhesController().handle);

router.put('/administrador/:id',isAuthenticated, editarAdministradorController.handle);

router.get("/administrador/:id", isAuthenticated, new BuscarAdministradorPorIdController().handle);

router.get("/estatisticas", isAuthenticated, estatisticasController.handle);

//ROTAS CATEGORIA

router.post('/categoria', isAuthenticated, new CriarCategoriaController().handle);

router.get('/categorias', new ListarCategoriaController().handle);

//ROTAS CONTEUDOS
// router.post('/conteudo', isAuthenticated, upload.single('file'), new CadastrarConteudoController().handle);
router.post('/conteudo', isAuthenticated, upload.single('file'), new CadastrarConteudoController().handle);

router.get('/filtrarConteudos', new FiltrarConteudoByCategoriaController().handle);

router.get("/conteudos", new ListarConteudosController().handle);

router.put("/conteudos/:id", isAuthenticated, upload.single("file"), editarConteudo.handle);

router.delete("/conteudos/:id", isAuthenticated, deletarConteudo.handle);

const buscarConteudoPorIdController = new BuscarConteudoPorIdController();

router.get("/conteudos/:id", buscarConteudoPorIdController.handle);

// Rotas para o recurso Liturgia

// Criar nova liturgia (requer autenticação)
router.post(
    "/liturgia",
    isAuthenticated,
    new CadastrarLiturgiaController().handle
);

// Listar todas as liturgias (pode ser público)
router.get(
    "/liturgias",
    new ListarLiturgiasController().handle
);

// Listar liturgia do dia (pode ser público)
router.get(
    "/liturgia-dia",
    new ListarLiturgiaDoDiaController().handle
);

// Excluir liturgia por ID (requer autenticação)
router.delete(
    "/liturgia/:id",
    isAuthenticated,
    new ExcluirLiturgiaController().handle
);

// Buscar liturgia por ID (pode ser público)
// Ajustando para instanciar o controller como nas outras rotas
router.get(
    "/liturgia/:id",
    buscarLiturgiaController.handle
);

// Editar liturgia por ID (requer autenticação)
// Ajustando para instanciar o controller
router.put(
    "/liturgia/:id",
    isAuthenticated, editarLiturgiaController.handle
);


//EVENTOS   

router.post('/evento', isAuthenticated, upload.single('file'), new CriarEventoController().handle);

router.get("/evento/:id", isAuthenticated, new ListarEventoPorIdController().handle);

router.get("/eventos", listarEventos.handle);

router.put("/eventos/:id", isAuthenticated, upload.single("file"), editarEvento.handle);

router.delete("/eventos/:id", isAuthenticated, deletarEvento.handle);

//INSCRIÇÕES PARA OS EVENTOS
router.post("/imagem", isAuthenticated, upload.single("file"), new CadastrarImagemController().handle);


router.get("/inscricoes", new ListarInscricoesController().handle);

router.post("/inscricoes", isAuthenticated, new CriarInscricaoController().handle);

router.put("/inscricoes/:id", isAuthenticated, new EditarInscricaoController().handle);

router.delete("/inscricoes/:id", isAuthenticated, new ExcluirInscricaoController().handle);

router.get("/inscricoes/evento/:eventoId", isAuthenticated, new ListarInscricoesPorEventoController().handle);

export default router;
