import { Router } from "express";
import { urlRoutes } from "./url.router";
import { userRoutes } from "./user.router";

const router = Router();

router.use("/api", urlRoutes);
router.use("/api", userRoutes);

export { router };
