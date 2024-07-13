// /// <reference path="./express.d.ts" />

// import 'reflect-metadata';
// import express, { Application, Request, Response } from 'express';
// import dotenv from 'dotenv';
// import userRoutes from './routes/user';
// import menuItemRoutes from './routes/menuItem';
// import { authenticateJWT } from './middleware/auth';

// dotenv.config();

// const app: Application = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.get('/', async (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

// app.use('/user', userRoutes);
// app.use('/menuItems', menuItemRoutes);

// // Example of a protected route
// app.get('/protected', authenticateJWT, (req: Request, res: Response) => {
//   res.send('This is a protected route.');
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

/// <reference path="./express.d.ts" />
import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import prisma from './prisma/client';
import userRoutes from './routes/user';
import menuItemRoutes from './routes/menuItem';
import { authenticateJWT } from './middleware/auth';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/user', userRoutes);
app.use('/menuItems', menuItemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
