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
exports.CadastrarConteudoController = void 0;
const CadastrarConteudoService_1 = require("../../services/conteudo/CadastrarConteudoService");
const cloudinary_1 = require("../../lib/cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
class CadastrarConteudoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, autor, descricao, categoria } = req.body;
            if (!req.file) {
                return res.status(400).json({ error: "Imagem não enviada." });
            }
            try {
                // Upload da imagem via stream usando buffer
                const streamUpload = () => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary_1.cloudinary.uploader.upload_stream({
                            folder: 'conteudos',
                        }, (error, result) => {
                            if (result) {
                                resolve(result);
                            }
                            else {
                                reject(error);
                            }
                        });
                        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
                    });
                };
                const uploadResult = yield streamUpload();
                // Salvar no banco usando o service
                const cadastrarConteudoService = new CadastrarConteudoService_1.CadastrarConteudoService();
                const conteudo = yield cadastrarConteudoService.execute({
                    titulo,
                    autor,
                    descricao,
                    categoria,
                    banner: uploadResult.secure_url
                });
                return res.status(201).json(conteudo);
            }
            catch (error) {
                console.error("Erro ao cadastrar conteúdo:", error);
                return res.status(500).json({ error: "Erro ao cadastrar conteúdo." });
            }
        });
    }
}
exports.CadastrarConteudoController = CadastrarConteudoController;
