import { Prisma } from 'generated/prisma';
import { prisma } from 'lib/prisma';
import type { UserRepository } from 'repository/interface/UserRepository';

export class UserPrismaRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async list() {
    const users = prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async update(data: Prisma.UserUpdateInput) {
    const user = prisma.user.update({
      where: {
        id: data.id as string,
      },
      data,
    });

    return user;
  }
}