import express from 'express';
import "dotenv/config";
import UserRouter from './users/users';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на http://127.0.0.1:${port}`);
});
