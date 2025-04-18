import express from "express";
import "dotenv/config";
import userRouter from "./routers/users";
import { client } from "./client/client";
import { applyMigrations } from "./migration";
import path from "path";
import fs from "fs"
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  throw new Error(".env файл отсутствует, добавьте его. ");
}

app.use("/users", userRouter);

if (!process.env.PORT) {
  throw new Error("Пожалуйста, укажите PORT в переменных окружения.");
}

const entry = async () => {
  try {
    await client.connect();
    console.log("Успешно подключено к базе данных.");

    await applyMigrations();
    console.log("Миграции успешно применены.");

    app.listen(port, () => {
      console.log(`Сервер запущен на http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.error("Ошибка при инициализации приложения:", error);
    process.exit(1);
  }
};

entry();
