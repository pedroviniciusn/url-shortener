import "reflect-metadata";
import express from "express";
import "express-async-errors";
import "./shared/container";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(errorHandler);

export { app };
