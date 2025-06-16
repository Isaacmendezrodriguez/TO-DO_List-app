import { create } from 'zustand';

const API_URL = 'http://localhost:3000/api';

const useTodoStore = create((set, get) => ({
  tasks: [],
  metrics: null,
  isLoading: false,
  error: null,

  // Cargar todas las tareas
  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const tasks = await response.json();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Error al cargar las tareas', isLoading: false });
    }
  },

  // Añadir una nueva tarea
  addTask: async (task) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al crear la tarea', isLoading: false });
    }
  },

  // Actualizar una tarea
  updateTask: async (id, updates) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al actualizar la tarea', isLoading: false });
    }
  },

  // Eliminar una tarea
  deleteTask: async (id) => {
    set({ isLoading: true });
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al eliminar la tarea', isLoading: false });
    }
  },

  // Actualizar estado de una tarea
  updateTaskStatus: async (id, status) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/tasks/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al actualizar el estado', isLoading: false });
    }
  },

  // Cargar métricas
  fetchMetrics: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/metrics`);
      const metrics = await response.json();
      set({ metrics, isLoading: false });
    } catch (error) {
      set({ error: 'Error al cargar las métricas', isLoading: false });
    }
  },
}));

export default useTodoStore;
