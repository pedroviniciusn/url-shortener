import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/index";
import { ICreateUser } from "../../dtos/ICreateUser";
import { IUpdateUser } from "../../dtos/IUpdateUser";
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

  async update({ id, email, name, password }: IUpdateUser): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });

    return user;
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
