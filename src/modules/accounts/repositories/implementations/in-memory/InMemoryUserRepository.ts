import { ICreateUser } from "../../../dtos/ICreateUser";
import { IUpdateUser } from "../../../dtos/IUpdateUser";
import { User } from "@prisma/client";
import { nanoid } from "nanoid";
import { IUserReposiroty } from "../../IUserRepository";

export class InMemoryUserRepository implements IUserReposiroty {
  public users: User[] = [];

  async create({ email, name, password }: ICreateUser): Promise<void> {
    const user = {
      id: nanoid(),
      name,
      email,
      password,
    };

    this.users.push(user);
  }

  async update({ id, email, name, password }: IUpdateUser): Promise<User> {
    let user = this.users.find((user) => user.id == id);

    Object.assign(user, {
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  async delete(userId: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex > -1) {
      this.users.splice(userIndex);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email == email);
  }

  async findById(userId: string): Promise<User> {
    return this.users.find((user) => user.id == userId);
  }
}
