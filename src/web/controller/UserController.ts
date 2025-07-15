import type { Request, Response } from 'express';
import { UserPrismaRepository } from 'repository/prisma/UserPrismaRepository';
import { CreateUserService } from 'service/user/CreateUserService';
import { DeleteUserService } from 'service/user/DeleteUserService';
import { ListUserService } from 'service/user/ListUserService';
import { ShowUserService } from 'service/user/ShowUserService';
import { UpdateUserService } from 'service/user/UpdateUserService';
import z from 'zod';

export class UserController {
  async create(request: Request, response: Response) {
    const schema = z.object({
      name: z
        .string({ error: 'Nome é requerido' })
        .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
      email: z
        .string({ error: 'Email é requerido' })
        .email({ message: 'Email inválido' }),
      password: z
        .string({ error: 'Senha é requerido' })
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    });

    const data = schema.parse(request.body);

    const userRepository = new UserPrismaRepository();
    const createUserService = new CreateUserService(userRepository);

    try {
      const { user } = await createUserService.execute(data);

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
    }
  }

  async list(request: Request, response: Response) {
    try {
      const userRepository = new UserPrismaRepository();
      const listUserService = new ListUserService(userRepository);

      const { users } = await listUserService.execute();

      return response.json(users);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params as { id: string };
    const { id: idLogged } = request.user;

    const userRepository = new UserPrismaRepository();

    const deleteUserService = new DeleteUserService(userRepository);

    try {
      await deleteUserService.execute({ id, idLogged });

      return response.status(204).send({ message: 'Usuario deletado' });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
    }
  }

  async show(request: Request, response: Response) {
    const id = request.user.id;

    const userRepository = new UserPrismaRepository();

    const showUserService = new ShowUserService(userRepository);

    try {
      const {user} = await showUserService.execute({ id });

      return response.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
    }
  }

  async update(request: Request, response: Response) {
    const schema = z.object({
      name: z
        .string()
        .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
        .optional(),
      email: z.string().email({ message: 'Email inválido' }).optional(),
      password: z
        .string()
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
        .optional(),
    });

    const data = schema.parse(request.body);

    const { id } = request.params as { id: string };

    const userRepository = new UserPrismaRepository();
    const updateUserService = new UpdateUserService(userRepository);

    try {
      const user = await updateUserService.execute({ id, ...data });

      return response.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
    }
  }
}