import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error";

const app = express();
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || "*" || "https://tes-indokerja-app-frontend.vercel.app",
//   credentials: true,
// }));

const allowedOrigins = [
  "https://indokerja-frontend-psi.vercel.app",
  "https://tes-indokerja-app-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

export default app;
