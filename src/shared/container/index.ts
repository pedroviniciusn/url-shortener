import { container } from "tsyringe";
import "./providers";
import { IUrlsRepository } from "../../modules/urls/repositories/IUrlsRepository";
import { UrlsRepository } from "../../modules/urls/repositories/implementations/UrlsRepository";
import { IUserReposiroty } from "../../modules/accounts/repositories/IUserRepository";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { IUserTokenRepository } from "../../modules/accounts/repositories/IUserTokenRepository";
import { UserTokenRepository } from "../../modules/accounts/repositories/implementations/UserTokenRepository";

container.registerSingleton<IUrlsRepository>("UrlsRepository", UrlsRepository);

container.registerSingleton<IUserReposiroty>("UserRepository", UserRepository);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);
