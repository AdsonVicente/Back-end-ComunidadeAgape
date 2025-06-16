import { Request, Response } from 'express';
import { cloudinary } from '../../lib/cloudinary';
import streamifier from 'streamifier';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
class CadastrarImagemGaleriaController {
    async handle(req: Request, res: Response) {
        const { titulo } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Imagem não enviada.' });
        }

        try {
            // Upload da imagem via stream
            const streamUpload = () => {
                return new Promise<{ secure_url: string }>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'galeria' },
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );
                    streamifier.createReadStream(req.file!.buffer).pipe(stream);
                });
            };

            const uploadResult = await streamUpload();

            // Salvar no banco
            const imagem = await prisma.galeria.create({
                data: {
                    titulo,
                    imagemUrl: uploadResult.secure_url,
                    categoria: req.body.categoria || 'default', // Categoria opcional
                },
            });

            return res.status(201).json(imagem);
        } catch (error) {
            console.error('Erro ao cadastrar imagem:', error);
            return res
                .status(500)
                .json({ error: 'Erro interno ao cadastrar imagem.' });
        }
    }
}

export { CadastrarImagemGaleriaController };
