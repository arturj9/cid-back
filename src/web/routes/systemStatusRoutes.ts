import { Router } from "express";
import { EnsureAuth } from "middleware/EnsureAuthentication";
import { SystemStatusController } from "web/controller/SystemStatusController";

export const systemStatusRoutes = Router();

const systemStatusController = new SystemStatusController();
const ensureAuth = new EnsureAuth();

systemStatusRoutes.post("/", systemStatusController.create);

systemStatusRoutes.get("/list", ensureAuth.handle, systemStatusController.list);
