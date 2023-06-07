import { Tokens, Urls } from "@prisma/client";
import { IUserResponse } from "../dtos/IUserResponse";
import { instanceToInstance } from "class-transformer";

interface User {
  id: string;
  email: string;
  name: string;
  urls?: Urls[];
  tokens?: Tokens[];
}

export class UserMap {
  static toMap({ id, email, name, tokens, urls }: User): IUserResponse {
    const user = instanceToInstance({
      id,
      name,
      email,
      urls,
      tokens,
    });

    return user;
  }
}
