import TaskRepository from '../repositories/TaskRepository.js';

class TaskService {
  async createTask(taskData) {
    return await TaskRepository.create(taskData);
  }

  async getAllTasks() {
    return await TaskRepository.findAll();
  }

  async getTaskById(id) {
    return await TaskRepository.findById(id);
  }

  async updateTask(id, taskData) {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    // Si la tarea se marca como completada, establecer completedAt
    if (taskData.status === 'COMPLETED' && task.status !== 'COMPLETED') {
      taskData.completedAt = new Date();
    } else if (taskData.status !== 'COMPLETED') {
      taskData.completedAt = null;
    }

    return await TaskRepository.update(id, taskData);
  }

  async deleteTask(id) {
    const deleted = await TaskRepository.delete(id);
    if (!deleted) {
      throw new Error('Task not found');
    }
    return true;
  }

  async getTaskMetrics() {
    return await TaskRepository.getTaskMetrics();
  }

  async updateTaskStatus(id, status) {
    const validStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const taskData = { status };
    if (status === 'COMPLETED') {
      taskData.completedAt = new Date();
    } else {
      taskData.completedAt = null;
    }

    return await this.updateTask(id, taskData);
  }
}

export default new TaskService();
