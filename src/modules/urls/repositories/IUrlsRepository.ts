import { ICreateNewUrl } from "../dtos/ICreateNewUrl";
import { Urls } from "@prisma/client";

export interface IUrlsRepository {
  create(data: ICreateNewUrl): Promise<void>;
  findUrl(url: string): Promise<Urls[] | null>;
  findNewUrl(newUrl: string): Promise<Urls | null>;
  delete(id: string): Promise<void>;
}
