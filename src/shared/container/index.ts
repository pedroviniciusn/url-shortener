import { container } from "tsyringe";
import { IUrlsRepository } from "../../modules/urls/repositories/IUrlsRepository";
import { UrlsRepository } from "../../modules/urls/repositories/implementations/UrlsRepository";
import { IUserReposiroty } from "../../modules/accounts/repositories/IUserRepository";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";

container.registerSingleton<IUrlsRepository>("UrlsRepository", UrlsRepository);

container.registerSingleton<IUserReposiroty>("UserRepository", UserRepository);
