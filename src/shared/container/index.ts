import { container } from "tsyringe";
import { IUrlsRepository } from "../../modules/urls/repositories/IUrlsRepository";
import { UrlsRepository } from "../../modules/urls/repositories/implementations/UrlsRepository";

container.registerSingleton<IUrlsRepository>("UrlsRepository", UrlsRepository);
