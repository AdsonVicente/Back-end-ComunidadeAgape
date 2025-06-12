"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarConteudoController = void 0;
const CadastrarConteudoService_1 = require("../../services/conteudo/CadastrarConteudoService");
const cloudinary_1 = require("../../lib/cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
class CadastrarConteudoController {
    async handle(req, res) {
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
            const uploadResult = await streamUpload();
            // Salvar no banco usando o service
            const cadastrarConteudoService = new CadastrarConteudoService_1.CadastrarConteudoService();
            const conteudo = await cadastrarConteudoService.execute({
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
    }
}
exports.CadastrarConteudoController = CadastrarConteudoController;
