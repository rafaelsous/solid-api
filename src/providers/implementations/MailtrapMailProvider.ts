import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { response, Response } from "express";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "a3e93f4c392be2",
        pass: "a92facae53edd4", 
      }
    });
  }

  async sendMail(message: IMessage): Promise<Response> {
    try {
      await this.transporter.sendMail({
        to: {
          name: message.to.name,
          address: message.to.email,
        },
        from: {
          name: message.from.name,
          address: message.from.email
        },
        subject: message.subject,
        html: message.body,
      });
    } catch(error) {
      return response.status(500).json({
        message: `Erro ao enviar email. ${error.message}`
      });
    }
  }

}