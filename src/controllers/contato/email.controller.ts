import { Request, Response } from "express";
import { sendContactEmail } from "../../services/contato/email.service";

export const handleSendEmail = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    await sendContactEmail(name, email, message);
    return res.status(200).json({ message: "Mensagem enviada com sucesso." });
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    return res.status(500).json({ error: "Erro ao enviar o e-mail." });
  }
};
