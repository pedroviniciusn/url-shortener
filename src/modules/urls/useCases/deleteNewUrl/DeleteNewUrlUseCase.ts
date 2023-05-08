import { AppError } from "@errors/AppError";
import { IUrlsRepository } from "@modules/urls/repositories/IUrlsRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export class DeleteNewUrlUseCase {
  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) {}

  async execute(newUrl: string) {
    const urlAlreadyExists = await this.urlsRepository.findNewUrl(newUrl);

    if (!urlAlreadyExists) {
      throw new AppError("URL not found");
    }

    await this.urlsRepository.delete(urlAlreadyExists.id);
  }
}
