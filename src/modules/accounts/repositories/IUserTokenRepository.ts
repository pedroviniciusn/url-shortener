import { Tokens } from "@prisma/client";
import { ICreateUserToken } from "../dtos/ICreateUserToken";

export interface IUserTokenRepository {
  create({ token, user_id, expires_date }: ICreateUserToken): Promise<Tokens>;
  findByUserIdAndToken(user_id: string, token: string): Promise<Tokens>;
  findByToken(token: string): Promise<Tokens>;
  deleteById(id: string): Promise<void>;
}
