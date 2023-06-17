import { nanoid } from "nanoid";
import path, { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { IUserReposiroty } from "../../repositories/IUserRepository";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserReposiroty,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider,

    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<string | object> {
    const __dirname = path.resolve(
      path.dirname(decodeURI(new URL(import.meta.url).pathname))
    );

    const user = await this.userRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User not found");
    }

    const token = nanoid();

    const expires_date = this.dateProvider.addHours(1);

    await this.userTokenRepository.create({
      user_id: user.id,
      expires_date,
      token,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const url = await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );

    const responseTest = {
      token,
    };

    return process.env.NODE_ENV == "test" ? responseTest : url;
  }
}
