import { Request, Response } from "express";
import { EditarConteudoService } from "../../services/conteudo/EditarConteudoService";
import { cloudinary } from "../../lib/cloudinary";
import { Readable } from "stream"; // IMPORTANTE!

class EditarConteudoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, descricao, categoria, autor } = req.body;
            let bannerUrl: string | undefined = undefined;

            // Função auxiliar para upload no Cloudinary
            function streamUpload(fileBuffer: Buffer, folder = "conteudos") {
                return new Promise<string>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder },
                        (error, result) => {
                            if (result) resolve(result.secure_url);
                            else reject(error);
                        }
                    );
                    Readable.from(fileBuffer).pipe(stream);
                });
            }

            // Se foi enviado um novo arquivo, faz upload
            if (req.file) {
                const fileBuffer = req.file.buffer;
                bannerUrl = await streamUpload(fileBuffer);
            }

            const editarConteudoService = new EditarConteudoService();

            const conteudo = await editarConteudoService.execute({
                id,
                titulo,
                descricao,
                categoria,
                autor,
                banner: bannerUrl // 👈 Corrigido aqui
            });

            return res.json(conteudo);
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(400).json({ error: "Erro ao atualizar conteúdo", details: errorMessage });
        }
    }
}

export { EditarConteudoController };
