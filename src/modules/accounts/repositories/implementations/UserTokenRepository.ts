import { Tokens } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { ICreateUserToken } from "../../dtos/ICreateUserToken";
import { IUserTokenRepository } from "../IUserTokenRepository";

export class UserTokenRepository implements IUserTokenRepository {
  async create({
    token,
    user_id,
    expires_date,
  }: ICreateUserToken): Promise<Tokens> {
    const userToken = await prisma.tokens.create({
      data: {
        token,
        user_id,
        expires_date,
      },
    });

    return userToken;
  }

  async findByUserIdAndToken(user_id: string, token: string): Promise<Tokens> {
    const userToken = await prisma.tokens.findFirst({
      where: {
        user_id,
        token,
      },
      include: {
        user: true,
      },
    });

    return userToken;
  }

  async findByToken(token: string): Promise<Tokens> {
    const userToken = await prisma.tokens.findFirst({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.tokens.delete({
      where: {
        id,
      },
    });
  }
}
