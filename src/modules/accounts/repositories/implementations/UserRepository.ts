import { User } from "@prisma/client";
import { prisma } from "@prsima/index";
import { ICreateUser } from "modules/accounts/dtos/ICreateUser";
import { IUserReposiroty } from "../IUserRepository";

export class UserRepository implements IUserReposiroty {
  async create({ name, email, password }: ICreateUser): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        urls: true,
      },
    });

    return user;
  }
}
