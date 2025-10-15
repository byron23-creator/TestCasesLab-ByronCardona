# 📚 TODO App - Proyecto de Pruebas de Integración

Este proyecto es una **aplicación TODO con API REST** desarrollada con **Node.js, Express y MongoDB**, diseñada específicamente para enseñar **pruebas de integración** en JavaScript.

## 🎯 Objetivo Educativo

Enseñar a estudiantes de desarrollo web los conceptos y implementación de:
- Pruebas de integración vs pruebas unitarias
- Testing de APIs REST con SuperTest
- Uso de MongoDB Memory Server para pruebas
- Patrones de setup/teardown en testing
- Manejo de bases de datos con Docker

## 🏗️ Arquitectura

```
todoApp/
├── 📄 package.json                    # Configuración y scripts npm
├── 🐳 docker-compose.yml              # Configuración de MongoDB
├── 📁 src/
│   ├── 🚀 server.js                   # Punto de entrada del servidor
│   ├── ⚙️ app.js                      # Configuración de Express
│   ├── 📁 models/
│   │   └── 🗂️ tarea.model.js          # Modelo Mongoose de Tareas
│   └── 📁 routes/
│       └── 🛣️ tareas.js              # Rutas CRUD de tareas
├── 📁 tests/
│   └── 📁 integration/
│       ├── ✅ tareas.test.js          # Pruebas completas
│       └── 📝 ejercicios-estudiantes.test.js  # Para estudiantes
└── 📁 docs/                          # Documentación
    ├── 📖 GUIA-PRUEBAS-INTEGRACION.md
    ├── 🐳 DOCKER-MONGODB-SETUP.md
    └── 🚀 INICIO-RAPIDO.md
```

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **Mongoose** - ODM para MongoDB
- **MongoDB** - Base de datos NoSQL

### Testing
- **Jest** - Framework de testing
- **SuperTest** - Testing HTTP para Express
- **MongoDB Memory Server** - MongoDB en memoria para pruebas

### DevOps
- **Docker** - Contenedores para MongoDB
- **Nodemon** - Hot reload en desarrollo

## 🚀 Inicio Rápido

### 1. Prerequisitos
```bash
node --version    # >= 16.0
npm --version     # >= 8.0
docker --version  # Opcional, para MongoDB
```

### 2. Instalación
```bash
# Clonar y configurar
git clone <repo-url>
cd todoApp
npm install
```

### 3. Iniciar MongoDB (Opción A - Docker Compose)
```bash
npm run docker:up
```

### 3. Iniciar MongoDB (Opción B - Contenedor Simple)  
```bash
npm run docker:mongo
```

### 4. Ejecutar la aplicación
```bash
npm run dev
```

### 5. Ejecutar pruebas
```bash
npm test
```

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/tareas` | Crear nueva tarea |
| `GET` | `/api/tareas` | Obtener todas las tareas |
| `GET` | `/api/tareas/:id` | Obtener tarea por ID |
| `PUT` | `/api/tareas/:id` | Actualizar tarea |
| `DELETE` | `/api/tareas/:id` | Eliminar tarea |

### Ejemplo de uso:
```bash
# Crear tarea
curl -X POST http://localhost:3000/api/tareas \
  -H "Content-Type: application/json" \
  -d '{"title": "Aprender testing", "completed": false}'

# Obtener todas
curl http://localhost:3000/api/tareas
```

## 🧪 Testing

### Ejecutar pruebas
```bash
# Todas las pruebas
npm test

# Modo watch (desarrollo)
npm run test:watch

# Solo ejercicios de estudiantes
npm test ejercicios-estudiantes
```

### Tipos de pruebas implementadas
1. **Happy Path** - Casos exitosos normales
2. **Validación** - Datos requeridos y formatos
3. **Edge Cases** - Recursos inexistentes
4. **Error Handling** - Manejo de errores

## 🔧 Scripts NPM Disponibles

```bash
# Desarrollo
npm run dev          # Servidor con hot reload
npm start           # Servidor producción

# Testing  
npm test            # Ejecutar todas las pruebas
npm run test:watch  # Modo vigilancia

# Docker
npm run docker:up    # Iniciar MongoDB + Mongo Express
npm run docker:down  # Parar servicios
npm run docker:logs  # Ver logs MongoDB
npm run docker:clean # Limpiar todo (⚠️ borra datos)
npm run docker:mongo # Solo MongoDB simple
```

## 🌐 Interfaces Web

Una vez iniciado con `npm run docker:up`:

- **API**: http://localhost:3000
- **MongoDB Express**: http://localhost:8081
  - Usuario: `admin`
  - Contraseña: `admin123`

## ⚠️ Notas Importantes

### Para Estudiantes
- Las pruebas usan **MongoDB Memory Server** (no Docker)
- Cada prueba tiene su propia BD limpia
- Los ejercicios están marcados con `TODO:`

### Para Profesores
- Docker es para desarrollo, no para pruebas
- Revisar `.env.example` para configuraciones
- Los ejercicios tienen dificultad progresiva

## 🆘 Solución de Problemas

### Error: "Cannot connect to Docker daemon"
```bash
# Asegurar que Docker Desktop esté ejecutándose
open -a Docker  # macOS
```

### Error: "Port 27017 already in use"
```bash
# Parar todos los contenedores MongoDB
docker stop $(docker ps -q --filter ancestor=mongo)
```

### Error: "connect ECONNREFUSED"
```bash
# Verificar estado de MongoDB
docker ps
# Si no está ejecutándose:
npm run docker:up
```

## 🤝 Contribuciones

Este proyecto es educativo. Las contribuciones deben:
1. Mantener simplicidad para estudiantes
2. Incluir documentación clara  
3. Seguir patrones establecidos
4. Agregar pruebas si es necesario

## 📄 Licencia

MIT - Proyecto educativo libre para uso en clases y talleres.

---

**¿Preguntas?** Revisar la documentación en `/docs/` o ejecutar `npm run docker:logs` para diagnosticar problemas.
