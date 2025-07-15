import type { Request, Response } from 'express';
import { UserPrismaRepository } from 'repository/prisma/UserPrismaRepository';
import { AuthUserService } from 'service/auth/AuthUserService';
import { z } from 'zod';

export class AuthController {
  async login(request: Request, response: Response) {
    const schema = z.object({
      email: z
        .string({ error: 'Email é requerido' })
        .email({ message: 'Email inválido' }),
      password: z
        .string({ error: 'Senha é requerido' })
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    });

    const { email, password } = schema.parse(request.body);

    const userRepository = new UserPrismaRepository();
    const authUserService = new AuthUserService(userRepository);

    const { token, } = await authUserService.execute({ email, password });

    return response.json({ token });
  }
}