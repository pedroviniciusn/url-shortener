import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

export class SendForgotPasswordMailController {
  async handler(req: Request, res: Response): Promise<Response | void> {
    const { email } = req.body;

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    const url = await sendForgotPasswordMailUseCase.execute(email);

    return process.env.NODE_ENV == "test" ? res.json(url) : res.redirect(url);
  }
}
