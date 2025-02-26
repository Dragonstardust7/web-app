import express from "express";
import "dotenv/config";

async function main() {
  const app = express();
  const dbPort = process.env.PORT;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get("/", (req, res) => {
    res.send("Привет Мага!");
  });

  app.listen(dbPort, () => {
    console.log(`Сервер запущен на http://127.0.0.1:${dbPort}`);
  });
}

main();
