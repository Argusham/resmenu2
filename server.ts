import express from 'express';
import authRoutes from './routes/authRoutes';
import menuRoutes from './routes/menuItem';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
