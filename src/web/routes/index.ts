import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { authRoutes } from './authRoutes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to the API' });
});
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export { routes };