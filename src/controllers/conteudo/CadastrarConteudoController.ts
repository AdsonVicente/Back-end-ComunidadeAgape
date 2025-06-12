import { Request, Response } from 'express';
import { CadastrarConteudoService } from '../../services/conteudo/CadastrarConteudoService';
import { cloudinary } from '../../lib/cloudinary';
import streamifier from 'streamifier';

class CadastrarConteudoController {
  async handle(req: Request, res: Response) {
    const { titulo, autor, descricao, categoria } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Imagem não enviada." });
    }

    try {
      // Upload da imagem via stream usando buffer
      const streamUpload = () => {
        return new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'conteudos',
            },
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

      // Salvar no banco usando o service
      const cadastrarConteudoService = new CadastrarConteudoService();
      const conteudo = await cadastrarConteudoService.execute({
        titulo,
        autor,
        descricao,
        categoria,
        banner: uploadResult.secure_url
      });

      return res.status(201).json(conteudo);
    } catch (error) {
      console.error("Erro ao cadastrar conteúdo:", error);
      return res.status(500).json({ error: "Erro ao cadastrar conteúdo." });
    }
  }
}

export { CadastrarConteudoController };
