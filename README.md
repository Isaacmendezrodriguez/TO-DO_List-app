# Sistema de Gestión de Tareas

Una aplicación web moderna para la gestión de tareas, construida con React, Vite, y Express.js.

## Características

- ✨ Interfaz moderna y responsiva con Tailwind CSS
- 📊 Dashboard con métricas y gráficos
- 🔄 Estados de tarea (Sin Iniciar, En Proceso, Terminada)
- ⭐ Clasificación por prioridad
- 📅 Fechas límite y seguimiento
- 🎯 Métricas de progreso en tiempo real
- 🔍 Filtrado y organización de tareas
- 💾 Persistencia de datos con SQLite

## Tecnologías Utilizadas

### Frontend
- React.js
- Vite
- Tailwind CSS
- Zustand (Gestión de estado)
- React Router
- Chart.js
- Headless UI

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite
- Clean Architecture

## Instalación

1. Clona el repositorio:
```bash
git clone [URL-del-repositorio]
cd [nombre-del-repositorio]
```

2. Instala las dependencias del frontend:
```bash
npm install
```

3. Instala las dependencias del backend:
```bash
cd server
npm install
```

## Uso

1. Inicia el servidor backend:
```bash
cd server
npm run dev
```

2. En otra terminal, inicia el servidor frontend:
```bash
cd ..
npm run dev
```

3. Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## Estructura del Proyecto

```
├── src/                      # Frontend source
│   ├── components/          # Componentes React
│   ├── store/              # Estado global (Zustand)
│   └── ...
├── server/                  # Backend source
│   ├── src/
│   │   ├── config/         # Configuración
│   │   ├── controllers/    # Controladores
│   │   ├── models/        # Modelos Sequelize
│   │   ├── repositories/  # Repositorios
│   │   ├── routes/       # Rutas API
│   │   └── services/     # Servicios
│   └── ...
```

## Características en Detalle

### Dashboard
- Visualización de métricas clave
- Gráficos de distribución de tareas
- Estadísticas de progreso

### Gestión de Tareas
- Creación y edición de tareas
- Asignación de prioridades
- Fechas límite
- Estados de progreso
- Descripciones detalladas

### UI/UX
- Diseño responsivo
- Tema moderno y limpio
- Transiciones suaves
- Feedback visual
- Modales interactivos

## Licencia

MIT

## Autor

[isaac mendez rodriguez ]

## Agradecimientos

- React Team
- Tailwind CSS Team
- Vite Team
