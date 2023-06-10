import { Urls } from "@prisma/client";
import { ICreateNewUrl } from "src/modules/urls/dtos/ICreateNewUrl";
import { IUrlsRepository } from "../../IUrlsRepository";
import { nanoid } from "nanoid";

export class InMemoryUrlsRepository implements IUrlsRepository {
  public urls: Urls[] = [];

  async create({ url, userId, newUrl }: ICreateNewUrl): Promise<void> {
    const date = new Date().toLocaleDateString("pt-br") as unknown as Date;

    const urls = {
      id: nanoid(),
      url,
      new_url: newUrl,
      user_id: userId,
      created_at: date,
    };

    this.urls.push(urls);
  }

  async findUrl(url: string): Promise<Urls[]> {
    const urls = this.urls.find((item) => item.url == url);

    return [urls];
  }

  async findNewUrl(newUrl: string): Promise<Urls> {
    return this.urls.find((item) => item.new_url == newUrl);
  }

  async delete(id: string): Promise<void> {
    const urlIndex = this.urls.findIndex((url) => url.id === id);

    if (urlIndex > -1) {
      this.urls.splice(urlIndex);
    }
  }
}
