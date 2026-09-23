import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error";

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
}));
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

export default app;
