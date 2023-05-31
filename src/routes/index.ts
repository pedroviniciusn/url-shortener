import { Router } from "express";
import { authenticateRoutes } from "./authenticate.router";
import { passwordRoutes } from "./password.routes";
import { urlRoutes } from "./url.router";
import { userRoutes } from "./user.router";

const router = Router();

router.use("/api", userRoutes);
router.use("/api", urlRoutes);
router.use("/api/password", passwordRoutes);
router.use(authenticateRoutes);

export { router };
