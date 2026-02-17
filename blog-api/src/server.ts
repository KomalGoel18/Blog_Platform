import app from "./app";
import authRoutes from './auth/auth.routes';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api/auth', authRoutes);