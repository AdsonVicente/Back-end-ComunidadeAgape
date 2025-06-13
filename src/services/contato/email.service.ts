import nodemailer from "nodemailer";
import { mailConfig } from "../../config/email";

export const sendContactEmail = async (name: string, email: string, message: string) => {
  const transporter = nodemailer.createTransport(mailConfig);

  await transporter.sendMail({
    from: `"${name}" <${email}>`,
    to: process.env.CONTACT_EMAIL_DEST, // define no .env o destinatário fixo
    subject: "Nova mensagem de contato do site",
    html: `
      <h2>Nova mensagem recebida</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong><br/>${message}</p>
    `,
  });
};
