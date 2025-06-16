import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import sequelize from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

// Configuración CORS más permisiva
app.use(cors({
  origin: ['https://to-do-list-isaac.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Middleware para headers de seguridad
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://to-do-list-isaac.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Todo List API is running!' });
});

// Sincronizar la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Rutas
app.use('/api', taskRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Sincronizar la base de datos y iniciar el servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    await sequelize.sync();
    console.log('Database synchronized successfully.');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
};

startServer();
