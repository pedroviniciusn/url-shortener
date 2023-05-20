import { Request, Response } from "express";
import { container } from "tsyringe";
import { RedirectUrlUseCase } from "./RedirectUrlUseCase";

export class RedirectUrlController {
  async handler(req: Request, res: Response) {
    const { newUrl } = req.params;

    const redirectUrlUseCase = container.resolve(RedirectUrlUseCase);

    const url = await redirectUrlUseCase.execute({ newUrl });

    return res.redirect(url);
  }
}
