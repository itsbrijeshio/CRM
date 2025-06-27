import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import { rateLimiter } from "./middlewares";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Anvaya!");
});

app.use("/api", rateLimiter({ windowMs: 5 * 60 * 1000, max: 5 }), routes);

export default app;
