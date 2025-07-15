import { Prisma, User } from 'generated/prisma';
import { UserType } from 'types/UserTypes';

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  list(): Promise<UserType[]>;

  delete(id: string): Promise<void>;

  findById(id: string): Promise<User | null>;

  update(data: Prisma.UserUpdateInput): Promise<User>;
}