import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

export class ResetPasswordUserController {
  async handler(req: Request, res: Response) {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUseCase.execute({ token, password });

    return res.send();
  }
}
