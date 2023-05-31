import { User } from "@prisma/client";
import { ICreateUser } from "../dtos/ICreateUser";
import { IUpdateUser } from "../dtos/IUpdateUser";

export interface IUserReposiroty {
  create(data: ICreateUser): Promise<void>;
  update(data: IUpdateUser): Promise<User>;
  delete(userId: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
}
