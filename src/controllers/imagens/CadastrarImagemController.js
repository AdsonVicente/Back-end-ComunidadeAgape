"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarImagemController = void 0;
const CadastrarImagemService_1 = require("../../services/imagens/CadastrarImagemService");
const cloudinary_1 = require("../../lib/cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
class CadastrarImagemController {
    async handle(req, res) {
        const { titulo, descricao } = req.body;
        const autorId = req.user.id; // considerando que o middleware isAuthenticated insere o id do admin em req.user
        if (!req.file) {
            return res.status(400).json({ error: "Imagem não enviada." });
        }
        try {
            const streamUpload = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary_1.cloudinary.uploader.upload_stream({
                        folder: "multimidia",
                    }, (error, result) => {
                        if (result)
                            resolve(result);
                        else
                            reject(error);
                    });
                    streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
                });
            };
            const uploadResult = await streamUpload();
            const cadastrarImagemService = new CadastrarImagemService_1.CadastrarImagemService();
            const imagem = await cadastrarImagemService.execute({
                titulo,
                descricao,
                url: uploadResult.secure_url,
                autorId,
            });
            return res.status(201).json(imagem);
        }
        catch (error) {
            console.error("Erro ao cadastrar imagem:", error);
            return res.status(500).json({ error: "Erro ao cadastrar imagem." });
        }
    }
}
exports.CadastrarImagemController = CadastrarImagemController;
