import { Op } from 'sequelize';
import Task from '../models/Task.js';

class TaskRepository {
  async create(taskData) {
    return await Task.create(taskData);
  }

  async findAll() {
    return await Task.findAll();
  }

  async findById(id) {
    return await Task.findByPk(id);
  }

  async update(id, taskData) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return await task.update(taskData);
  }

  async delete(id) {
    const task = await Task.findByPk(id);
    if (!task) return false;
    await task.destroy();
    return true;
  }

  async getTaskMetrics() {
    const [notStarted, inProgress, completed] = await Promise.all([
      Task.count({ where: { status: 'NOT_STARTED' } }),
      Task.count({ where: { status: 'IN_PROGRESS' } }),
      Task.count({ where: { status: 'COMPLETED' } })
    ]);

    const [lowPriority, mediumPriority, highPriority] = await Promise.all([
      Task.count({ where: { priority: 'LOW' } }),
      Task.count({ where: { priority: 'MEDIUM' } }),
      Task.count({ where: { priority: 'HIGH' } })
    ]);

    const overdueTasks = await Task.count({
      where: {
        status: {
          [Op.ne]: 'COMPLETED'
        },
        dueDate: {
          [Op.lt]: new Date()
        }
      }
    });

    return {
      status: { notStarted, inProgress, completed },
      priority: { low: lowPriority, medium: mediumPriority, high: highPriority },
      overdueTasks
    };
  }
}

export default new TaskRepository();
