import { inject, injectable } from "tsyringe";
import { nanoid } from "nanoid";
import { AppError } from "../../../../errors/AppError";
import { ICreateNewUrlDTO } from "../../dtos/ICreateNewUrl";
import { IUrlsRepository } from "../../repositories/IUrlsRepository";

@injectable()
export class CreateNewUrlUseCase {
  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) {}

  async execute(url: string): Promise<void> {
    const urlAlreadyExists = await this.urlsRepository.findUrl(url);

    if (urlAlreadyExists) {
      throw new AppError("Url has already been formatted", 422);
    }

    const newUrl = nanoid(5);

    await this.urlsRepository.create({ url, newUrl });
  }
}
