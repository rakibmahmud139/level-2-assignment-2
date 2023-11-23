import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

// app.use('/api/users');

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to my world',
  });
});

export default app;
