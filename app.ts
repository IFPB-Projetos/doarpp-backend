import cors from "cors";
import express, { json, urlencoded } from "express";
import "express-async-errors";
import { authMiddleware } from "./auth/authMiddleware";
import { errorMiddleware } from "./config/errorMiddleware";
import { logMiddleware } from "./config/logMiddleware";
import { notFoundRouter } from "./config/notFoundRouter";
import { router } from "./router";

export const app = express();

app.use(express.static("public"));
app.use(logMiddleware);
app.use(authMiddleware);
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());
app.use(router);
app.use(notFoundRouter);
app.use(errorMiddleware);
