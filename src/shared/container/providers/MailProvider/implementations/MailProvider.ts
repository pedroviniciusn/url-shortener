import { readFileSync } from "fs";
import Handlebars from "handlebars";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from "nodemailer";
import { IMailProvider } from "../IMailProvider";

export class MailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    createTestAccount()
      .then((account) => {
        const transporter = createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = readFileSync(path).toString("utf-8");

    const templateParse = Handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Team URL Shortener <noreplay@urlshortener.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(message));
  }
}
