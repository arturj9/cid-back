import { Router } from "express";
import { EnsureAuth } from "middleware/EnsureAuthentication";
import { UserController } from "web/controller/UserController";

export const userRoutes = Router();

const userController = new UserController();
const ensureAuth = new EnsureAuth();

userRoutes.post("/", userController.create);

userRoutes.get("/list", ensureAuth.handle, userController.list);

userRoutes.delete("/:id", ensureAuth.handle, userController.delete);

userRoutes.get("/", ensureAuth.handle, userController.show);

userRoutes.put("/:id", ensureAuth.handle, userController.update);
