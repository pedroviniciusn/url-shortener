import { Tokens } from "@prisma/client";
import { ICreateUserToken } from "src/modules/accounts/dtos/ICreateUserToken";
import { IUserTokenRepository } from "../../IUserTokenRepository";
import { nanoid } from "nanoid";

export class InMemoryUserTokenRepository implements IUserTokenRepository {
  public userToken: Tokens[] = [];

  async create({
    token,
    user_id,
    expires_date,
  }: ICreateUserToken): Promise<Tokens> {
    const date = new Date().toLocaleDateString("pt-br") as unknown as Date;

    const userToken = {
      id: nanoid(),
      token,
      user_id,
      expires_date,
      created_at: date,
    };

    this.userToken.push(userToken);

    return userToken;
  }

  async findByUserIdAndToken(user_id: string, token: string): Promise<Tokens> {
    return this.userToken.find(
      (user) => user.user_id == user_id && user.token == token
    );
  }

  async findByToken(token: string): Promise<Tokens> {
    return this.userToken.find((user) => user.token == token);
  }

  async deleteById(id: string): Promise<void> {
    const userIndex = this.userToken.findIndex((user) => user.id === id);

    if (userIndex > -1) {
      this.userToken.splice(userIndex);
    }
  }
}
