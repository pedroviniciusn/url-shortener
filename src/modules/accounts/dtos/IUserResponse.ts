import { Tokens, Urls } from "@prisma/client";

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  urls?: Urls[];
  tokens?: Tokens[];
}
