import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useTodoStore from '../store/todoStore'
import TaskForm from './TaskForm'
import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline'

export default function TaskList() {
  const { tasks, fetchTasks, updateTask, deleteTask, updateTaskStatus } = useTodoStore()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const startEdit = (task) => {
    setEditingTask({ ...task })
    setIsEditModalOpen(true)
  }

  const handleStatusChange = async (task) => {
    let newStatus
    switch (task.status) {
      case 'NOT_STARTED':
        newStatus = 'IN_PROGRESS'
        break
      case 'IN_PROGRESS':
        newStatus = 'COMPLETED'
        break
      case 'COMPLETED':
        newStatus = 'NOT_STARTED'
        break
      default:
        newStatus = 'NOT_STARTED'
    }
    await updateTaskStatus(task.id, newStatus)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'NOT_STARTED':
        return <ClockIcon className="h-6 w-6 text-gray-400" />
      case 'IN_PROGRESS':
        return <PlayIcon className="h-6 w-6 text-yellow-500" />
      case 'COMPLETED':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />
      default:
        return <ClockIcon className="h-6 w-6 text-gray-400" />
    }
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      HIGH: {
        color: 'bg-red-100 text-red-700',
        icon: <ExclamationCircleIcon className="h-4 w-4 inline mr-1" />,
        text: 'Alta'
      },
      MEDIUM: {
        color: 'bg-yellow-100 text-yellow-700',
        icon: <ExclamationCircleIcon className="h-4 w-4 inline mr-1" />,
        text: 'Media'
      },
      LOW: {
        color: 'bg-green-100 text-green-700',
        icon: <ExclamationCircleIcon className="h-4 w-4 inline mr-1" />,
        text: 'Baja'
      }
    }
    const badge = badges[priority] || badges.MEDIUM
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.icon}
        {badge.text}
      </span>
    )
  }

  return (
    <>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                        Estado
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Tarea
                      </th>
                      <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Descripción
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Prioridad
                      </th>
                      <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fecha límite
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {tasks.map((task) => (
                      <tr key={task.id} className={task.status === 'COMPLETED' ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
                          <button
                            onClick={() => handleStatusChange(task)}
                            className="rounded-full p-1 hover:bg-gray-100"
                          >
                            {getStatusIcon(task.status)}
                          </button>
                        </td>
                        <td className="whitespace-normal break-words px-3 py-4 text-sm text-gray-900 max-w-[200px]">
                          <div className={task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''}>
                            {task.title}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell whitespace-normal break-words px-3 py-4 text-sm text-gray-500 max-w-[300px]">
                          {task.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          {getPriorityBadge(task.priority)}
                        </td>
                        <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => startEdit(task)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <TaskForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingTask(null)
        }}
        editingTask={editingTask}
      />
    </>
  )
}
