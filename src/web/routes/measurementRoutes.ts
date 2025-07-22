import { Router } from "express";
import { EnsureAuth } from "middleware/EnsureAuthentication";
import { MeasurementController } from "web/controller/MeasurementController";

export const measurementRoutes = Router();

const measurementController = new MeasurementController();
const ensureAuth = new EnsureAuth();

measurementRoutes.post("/", measurementController.create);

measurementRoutes.get("/list", ensureAuth.handle, measurementController.list);
