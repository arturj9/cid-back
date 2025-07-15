import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { authRoutes } from './authRoutes';
import { measurementRoutes } from './measurementRoutes';
import { systemStatusRoutes } from './systemStatusRoutes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to the API' });
});
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use("/measurements", measurementRoutes);
routes.use("/system-status", systemStatusRoutes);

export { routes };