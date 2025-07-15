import { Router } from "express";
import { EnsureAuth } from "middleware/EnsureAuthentication";
import { MeasurementController } from "web/controller/MeasurementController";

export const measurementRoutes = Router();

const measurementController = new MeasurementController();
const ensureAuth = new EnsureAuth();

// Criar uma nova medição (não precisa de auth, depende de sua regra)
measurementRoutes.post("/", measurementController.create);

// Listar últimas medições (requer autenticação)
measurementRoutes.get("/list", ensureAuth.handle, measurementController.list);
