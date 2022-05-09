import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: { user: "976e84d1d85eeb", pass: "057b8d5f25eb3e" },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "cjsdiniz@outlook.com",
      to: "diniz.cgi@gmail.com",
      subject,
      html: body,
    });
  }
}
