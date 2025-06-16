import { useState } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import Dashboard from './components/Dashboard'
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-primary-600">
                  Sistema de Gestión de Tareas
                </Link>
                <Link to="/dashboard" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600">
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Todas las tareas</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Gestiona y organiza tus tareas de manera eficiente
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Nueva Tarea
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-8">
                  <TaskStats />
                </div>

                {/* Task List */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-4 py-5 sm:p-6">
                    <TaskList />
                  </div>
                </div>

                {/* Task Form Modal */}
                <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
              </div>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
