import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import "./shared/container";
import { router } from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(router);

app.use(errorHandler);

export { app };
