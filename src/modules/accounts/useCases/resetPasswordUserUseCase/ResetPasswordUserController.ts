import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

export class ResetPasswordUserController {
  async handler(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUseCase.execute({ token, password });

    return res.status(200).json({
      message: "Password updated",
    });
  }
}
