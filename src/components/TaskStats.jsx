import { Link } from 'react-router-dom'
import useTodoStore from '../store/todoStore'
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

export default function TaskStats() {
  const tasks = useTodoStore((state) => state.tasks)

  const stats = [
    {
      name: 'Total de Tareas',
      value: tasks.length,
      icon: ClipboardDocumentListIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Completadas',
      value: tasks.filter((task) => task.completed).length,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Pendientes',
      value: tasks.filter((task) => !task.completed).length,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Alta Prioridad',
      value: tasks.filter((task) => task.priority === 'high').length,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className={`absolute rounded-md ${stat.bgColor} p-3`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className={`text-2xl font-semibold ${stat.textColor}`}>{stat.value}</p>
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link
                  to="/dashboard"
                  className={`font-medium ${stat.textColor} hover:opacity-75`}
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </dd>
        </div>
      ))}
    </div>
  )
}
