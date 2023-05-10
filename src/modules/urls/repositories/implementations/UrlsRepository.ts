import { Urls } from "@prisma/client";
import { ICreateNewUrl } from "../../dtos/ICreateNewUrl";
import { IUrlsRepository } from "../IUrlsRepository";
import { prisma } from "../../../../prisma";

export class UrlsRepository implements IUrlsRepository {
  async create({ url, newUrl }: ICreateNewUrl): Promise<void> {
    await prisma.urls.create({
      data: {
        url,
        new_url: newUrl,
      },
    });
  }

  async findUrl(url: string): Promise<Urls | null> {
    const urlAlreadyExists = await prisma.urls.findFirst({
      where: {
        url,
      },
    });

    return urlAlreadyExists;
  }

  async findNewUrl(newUrl: string): Promise<Urls | null> {
    const url = await prisma.urls.findFirst({
      where: {
        new_url: newUrl,
      },
    });

    return url;
  }

  async delete(id: string): Promise<void> {
    await prisma.urls.delete({
      where: {
        id,
      },
    });
  }
}
