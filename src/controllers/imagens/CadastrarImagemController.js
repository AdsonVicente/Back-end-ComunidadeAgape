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
exports.CadastrarImagemController = void 0;
const CadastrarImagemService_1 = require("../../services/imagens/CadastrarImagemService");
const cloudinary_1 = require("../../lib/cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
class CadastrarImagemController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const uploadResult = yield streamUpload();
                const cadastrarImagemService = new CadastrarImagemService_1.CadastrarImagemService();
                const imagem = yield cadastrarImagemService.execute({
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
        });
    }
}
exports.CadastrarImagemController = CadastrarImagemController;
