import type { NextFunction, Request, Response } from 'express';
import { Prisma } from 'generated/prisma';
import jwt from 'jsonwebtoken';
import { ArgumentNotValidError } from 'service/error/ArgumentNotValidError';
import { TokenAuthorizationMissingError } from 'service/error/TokenAuthorizationMissingError';
import { UserUnauthorizedError } from 'service/error/UserUnauthorizedError';
import { ZodError } from 'zod';

export function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Error de validação',
      issues: error.issues,
    });
  }

  if (error instanceof TokenAuthorizationMissingError) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }

  if (error instanceof UserUnauthorizedError) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }

  if (error instanceof jwt.TokenExpiredError) {
    console.error(error);
    return res.status(401).json({ message: 'Token expirado' });
  }

  if (error instanceof ArgumentNotValidError) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno do servidor' });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof Error) {
    console.error(error);

    if (error.message) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Error interno do servidor' });
  }
}