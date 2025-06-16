import TaskService from '../services/TaskService.js';
import { validationResult } from 'express-validator';

class TaskController {
  async createTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTaskById(req, res) {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await TaskService.updateTask(req.params.id, req.body);
      res.json(task);
    } catch (error) {
      if (error.message === 'Task not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async deleteTask(req, res) {
    try {
      await TaskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Task not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const { status } = req.body;
      const task = await TaskService.updateTaskStatus(req.params.id, status);
      res.json(task);
    } catch (error) {
      if (error.message === 'Invalid status') {
        res.status(400).json({ message: error.message });
      } else if (error.message === 'Task not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async getTaskMetrics(req, res) {
    try {
      const metrics = await TaskService.getTaskMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TaskController();
