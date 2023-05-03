import { ICreateNewUrlDTO } from "../dtos/ICreateNewUrl";
import { Urls } from "@prisma/client";

export interface IUrlsRepository {
  create(data: ICreateNewUrlDTO): Promise<void>;
  findUrl(newUrl: string): Promise<Urls | null>;
  delete(id: string): Promise<void>;
}
