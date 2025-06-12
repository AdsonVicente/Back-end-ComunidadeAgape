"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarEventoController = void 0;
const CriarEventoService_1 = require("../../services/evento/CriarEventoService");
const cloudinary_1 = require("../../lib/cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
class CriarEventoController {
    async handle(req, res) {
        const { titulo, descricao, local, data, horario } = req.body;
        if (!titulo || !descricao || !local || !data || !horario) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }
        if (!req.file) {
            return res.status(400).json({ error: "Imagem do evento é obrigatória." });
        }
        try {
            const uploadImagemParaCloudinary = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary_1.cloudinary.uploader.upload_stream({ folder: "eventos" }, (error, result) => {
                        if (result)
                            resolve(result);
                        else
                            reject(error);
                    });
                    streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
                });
            };
            const uploadResult = await uploadImagemParaCloudinary();
            const criarEventoService = new CriarEventoService_1.CriarEventoService();
            const evento = await criarEventoService.execute({
                titulo,
                descricao,
                local,
                data,
                horario,
                banner: uploadResult.secure_url,
            });
            return res.status(201).json(evento);
        }
        catch (error) {
            console.error("Erro ao criar evento:", error.stack || error);
            return res.status(500).json({ error: "Erro interno ao criar evento." });
        }
    }
}
exports.CriarEventoController = CriarEventoController;
