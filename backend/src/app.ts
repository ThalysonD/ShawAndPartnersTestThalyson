import "express-async-errors";
import express from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fileRoutes from "./routes/file.routes";
import userRoutes from "./routes/user.routes";
import requestLoggerMiddleware from "./middlewares/requestLogger.middleware";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  process.env.ALLOWED_LOCAL_ORIGIN,
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(limiter);
app.use(requestLoggerMiddleware);
app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandlerMiddleware);

export default app;
