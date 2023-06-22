import { Request, Response } from "express";
import { container } from "tsyringe";
import { RedirectUrlUseCase } from "./RedirectUrlUseCase";

export class RedirectUrlController {
  async handler(req: Request, res: Response): Promise<Response | void> {
    const { newurl } = req.params;

    const redirectUrlUseCase = container.resolve(RedirectUrlUseCase);

    const url = await redirectUrlUseCase.execute({newUrl: newurl});

    return process.env.NODE_ENV == "test" ? res.json(url) : res.redirect(url);
  }
}
