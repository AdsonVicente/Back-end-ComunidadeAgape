import { Request, Response } from "express";
import { CadastrarContatoService } from "../../services/contato/email.service";
class CadastrarContatoController {
  async handle(req: Request, res: Response) {
    const { nome, email, assunto, mensagem } = req.body;

    const cadastrarContatoService = new CadastrarContatoService();

    const contato = await cadastrarContatoService.execute({
      nome,
      email,
      assunto,
      mensagem
    });

    return res.json({ contato })
  }
}
export { CadastrarContatoController };