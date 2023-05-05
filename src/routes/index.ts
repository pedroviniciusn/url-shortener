import { Router } from "express";
import { urlRoutes } from "./url.router";

const router = Router();

router.use("/api", urlRoutes);

export { router };
