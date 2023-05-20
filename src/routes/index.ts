import { Router } from "express";
import { authenticateRoutes } from "./authenticate.router";
import { urlRoutes } from "./url.router";
import { userRoutes } from "./user.router";

const router = Router();

router.use("/api", userRoutes);
router.use("/api", urlRoutes);
router.use(authenticateRoutes);

export { router };
