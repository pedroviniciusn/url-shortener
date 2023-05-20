import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetDataUserUseCase } from "./GetDataUserUseCase";

export class GetDataUserController {
  async handler(req: Request, res: Response) {
    const { id: userId } = req.user;

    const getDataUserUseCase = container.resolve(GetDataUserUseCase);

    const user = await getDataUserUseCase.execute({ userId });

    return res.status(200).json(user);
  }
}
