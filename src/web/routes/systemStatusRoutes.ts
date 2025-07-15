import { Router } from "express";
import { EnsureAuth } from "middleware/EnsureAuthentication";
import { SystemStatusController } from "web/controller/SystemStatusController";

export const systemStatusRoutes = Router();

const systemStatusController = new SystemStatusController();
const ensureAuth = new EnsureAuth();

// Criar novo status do sistema
systemStatusRoutes.post("/", systemStatusController.create);

// Listar últimos status do sistema
systemStatusRoutes.get("/list", ensureAuth.handle, systemStatusController.list);
