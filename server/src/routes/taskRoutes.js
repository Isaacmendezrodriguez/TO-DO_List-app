import { Router } from 'express';
import { body } from 'express-validator';
import TaskController from '../controllers/TaskController.js';

const router = Router();

const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('status')
    .optional()
    .isIn(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['LOW', 'MEDIUM', 'HIGH'])
    .withMessage('Invalid priority'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format')
];

// Rutas CRUD básicas
router.post('/tasks', taskValidation, TaskController.createTask);
router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.put('/tasks/:id', taskValidation, TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

// Ruta para actualizar el estado de una tarea
router.patch('/tasks/:id/status', 
  body('status')
    .isIn(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Invalid status'),
  TaskController.updateTaskStatus
);

// Ruta para obtener métricas
router.get('/metrics', TaskController.getTaskMetrics);

export default router;
