import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import chalk from "chalk";
import connectionToDB from "./config/connectDB.js";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import mongoSanitize from "express-mongo-sanitize";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";

await connectionToDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(mongoSanitize());

app.use(morganMiddleware);

app.get("/api/v1/test", (req, res) => {
  res.json({
    data: "Welcome to the invoice generator",
  });
});

app.use("/api/v1/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("☑️")} 👍 Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV
    )} mode on port ${chalk.blue.bold(PORT)}`
  );
  systemLogs.info(
    `Server  running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
