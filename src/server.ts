import "reflect-metadata";
import "express-async-errors";
import express from "express";
import "./shared/container";
import { errorHandler } from "./middlewares/errorHandler";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(router);

export { app };
