import { Request, Response } from "express";
import { CriarEventoService } from "../../services/evento/CriarEventoService";
import { cloudinary } from "../../lib/cloudinary";
import streamifier from "streamifier";

interface EventoRequest {
  titulo: string;
  descricao: string;
  local: string;
  data: string;
  horario: string;
}

class CriarEventoController {
  async handle(req: Request, res: Response) {
    const { titulo, descricao, local, data, horario }: EventoRequest = req.body;

    if (!titulo || !descricao || !local || !data || !horario) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Imagem do evento é obrigatória." });
    }

    try {
      const uploadImagemParaCloudinary = () => {
        return new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "eventos" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file!.buffer).pipe(stream);
        });
      };

      const uploadResult = await uploadImagemParaCloudinary();

      const criarEventoService = new CriarEventoService();

      const evento = await criarEventoService.execute({
        titulo,
        descricao,
        local,
        data,
        horario,
        banner: uploadResult.secure_url,
      });

      return res.status(201).json(evento);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao criar evento:", error.stack || error.message);
      } else {
        console.error("Erro ao criar evento:", error);
      }
      return res.status(500).json({ error: "Erro interno ao criar evento." });
    }
  }
}

export { CriarEventoController };
