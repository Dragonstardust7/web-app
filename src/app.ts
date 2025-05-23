import express from 'express';
import "dotenv/config";
import userRouter from './routers/users';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на http://127.0.0.1:${port}`);
});
