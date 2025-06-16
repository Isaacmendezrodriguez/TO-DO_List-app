import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import sequelize from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://todo-list-app-isaacmendez.vercel.app']
    : ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Todo List API is running!' });
});

// Rutas
app.use('/api', taskRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Sincronizar la base de datos y iniciar el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
