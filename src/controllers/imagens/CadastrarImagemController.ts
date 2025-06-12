import { Request, Response } from "express";
import { CadastrarImagemService } from "../../services/imagens/CadastrarImagemService";
import { cloudinary } from "../../lib/cloudinary";
import streamifier from "streamifier";

// Extende a interface Request para incluir o campo user
declare module "express-serve-static-core" {
    interface Request {
        user: {
            id: string;
            // outros campos se necessário
        };
    }
}

class CadastrarImagemController {
    async handle(req: Request, res: Response) {
        const { titulo, descricao } = req.body;
        const autorId = req.user.id; // considerando que o middleware isAuthenticated insere o id do admin em req.user

        if (!req.file) {
            return res.status(400).json({ error: "Imagem não enviada." });
        }

        try {
            const streamUpload = () => {
                return new Promise<{ secure_url: string }>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "multimidia",
                        },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    streamifier.createReadStream(req.file!.buffer).pipe(stream);
                });
            };

            const uploadResult = await streamUpload();

            const cadastrarImagemService = new CadastrarImagemService();

            const imagem = await cadastrarImagemService.execute({
                titulo,
                descricao,
                url: uploadResult.secure_url,
                autorId,
            });

            return res.status(201).json(imagem);
        } catch (error) {
            console.error("Erro ao cadastrar imagem:", error);
            return res.status(500).json({ error: "Erro ao cadastrar imagem." });
        }
    }
}

export { CadastrarImagemController };
