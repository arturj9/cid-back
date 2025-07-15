import { Router } from 'express';
import { AuthController } from 'web/controller/AuthController';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/', authController.login);

export { authRoutes };