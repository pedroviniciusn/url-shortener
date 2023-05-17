import { AppError } from "../../../../errors/AppError";
import { IUrlsRepository } from "../../repositories/IUrlsRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  newUrl: string;
  userId: string;
}

@injectable()
export class DeleteNewUrlUseCase {
  constructor(
    @inject("UrlsRepository")
    private urlsRepository: IUrlsRepository
  ) {}

  async execute({ newUrl, userId }: IRequest) {
    const urlAlreadyExists = await this.urlsRepository.findNewUrl(newUrl);

    if (!urlAlreadyExists || urlAlreadyExists.userId != userId) {
      throw new AppError("URL not found");
    }

    await this.urlsRepository.delete(urlAlreadyExists.id);
  }
}
