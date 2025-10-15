# 🐳 Guía: MongoDB con Docker para Desarrollo

## ¿Por qué usar MongoDB con Docker?

### Ventajas
- ✅ **Instalación simple** - No necesitas instalar MongoDB localmente
- ✅ **Consistencia** - Misma versión para todo el equipo
- ✅ **Aislamiento** - No interfiere con otras instalaciones
- ✅ **Limpieza fácil** - Eliminar contenedor limpia todo
- ✅ **Múltiples versiones** - Puedes tener diferentes versiones

### Desventajas
- ❌ **Requiere Docker** - Dependencia adicional
- ❌ **Uso de memoria** - Docker consume recursos
- ❌ **Curva de aprendizaje** - Comandos Docker básicos

## 📋 Prerrequisitos

### 1. Instalar Docker Desktop
- **macOS**: Descargar desde [docker.com](https://www.docker.com/products/docker-desktop)
- **Windows**: Docker Desktop for Windows
- **Linux**: Docker Engine

### 2. Verificar instalación
```bash
docker --version
docker-compose --version
```

## 🚀 Método 1: Contenedor Simple

### Ejecutar MongoDB
```bash
# Ejecutar MongoDB en un contenedor
docker run --name mongodb-todoapp -p 27017:27017 -d mongo:latest
```

### Explicación del comando:
- `docker run` - Ejecutar un nuevo contenedor
- `--name mongodb-todoapp` - Nombre del contenedor
- `-p 27017:27017` - Mapear puerto (host:contenedor)
- `-d` - Ejecutar en background (detached)
- `mongo:latest` - Imagen oficial de MongoDB

### Comandos útiles:
```bash
# Ver contenedores ejecutándose
docker ps

# Parar el contenedor
docker stop mongodb-todoapp

# Iniciar contenedor existente
docker start mongodb-todoapp

# Ver logs del contenedor
docker logs mongodb-todoapp

# Eliminar contenedor
docker rm mongodb-todoapp

# Eliminar contenedor y datos
docker rm -f mongodb-todoapp
```

## 🗄️ Método 2: Con Persistencia de Datos

### Crear volumen para datos persistentes
```bash
# Crear volumen
docker volume create mongodb-data

# Ejecutar con volumen
docker run --name mongodb-todoapp \
  -p 27017:27017 \
  -v mongodb-data:/data/db \
  -d mongo:latest
```

### Explicación:
- `-v mongodb-data:/data/db` - Mapear volumen para persistir datos

## 🐳 Método 3: Docker Compose (Recomendado)

### Crear archivo `docker-compose.yml`
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: mongodb-todoapp
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      # Opcional: agregar autenticación
      # MONGO_INITDB_ROOT_USERNAME: admin
      # MONGO_INITDB_ROOT_PASSWORD: password
    networks:
      - todoapp-network

  # Opcional: MongoDB Express (GUI)
  mongo-express:
    image: mongo-express:latest
    container_name: mongo-express-todoapp
    restart: unless-stopped
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_SERVER: mongodb
      ME_CONFIG_MONGODB_PORT: 27017
      # ME_CONFIG_MONGODB_AUTH_USERNAME: admin
      # ME_CONFIG_MONGODB_AUTH_PASSWORD: password
    depends_on:
      - mongodb
    networks:
      - todoapp-network

volumes:
  mongodb_data:

networks:
  todoapp-network:
    driver: bridge
```

### Comandos Docker Compose:
```bash
# Iniciar servicios
docker compose up -d

# Ver logs
docker compose logs mongodb

# Parar servicios
docker compose down

# Parar y eliminar volúmenes
docker compose down -v

# Reconstruir servicios
docker compose up --build -d
```

## 🔧 Configuración para el Proyecto

### Actualizar `src/server.js`
```javascript
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo_app';

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error conectando a MongoDB:', err);
});
```

### Variables de entorno (opcional)
Crear archivo `.env`:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/todo_app
NODE_ENV=development
```

## 🧪 MongoDB para Pruebas

### Para pruebas de integración, seguimos usando MongoDB Memory Server:
```javascript
const { MongoMemoryServer } = require('mongodb-memory-server');

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});
```

**¿Por qué no usar el contenedor Docker para pruebas?**
- ❌ **Más lento** - Crear/destruir contenedores toma tiempo
- ❌ **Dependencia externa** - Las pruebas dependen de Docker
- ❌ **Complejidad** - Setup más complejo
- ✅ **Memory Server es ideal** - Rápido, aislado, limpio

## 📝 Scripts npm Actualizados

Actualizar `package.json`:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --detectOpenHandles --forceExit",
    "test:watch": "jest --watch --detectOpenHandles --forceExit",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f mongodb",
    "docker:clean": "docker-compose down -v && docker volume prune -f"
  }
}
```

## 🛠️ Comandos de Desarrollo

### Flujo de trabajo típico:
```bash
# 1. Iniciar MongoDB
npm run docker:up

# 2. Ejecutar aplicación en desarrollo
npm run dev

# 3. En otra terminal, ejecutar pruebas
npm test

# 4. Al finalizar, parar MongoDB
npm run docker:down
```

## 🔍 Herramientas de Monitoreo

### 1. MongoDB Compass (GUI Oficial)
- Descargar desde [mongodb.com/compass](https://www.mongodb.com/products/compass)
- Conectar a: `mongodb://localhost:27017`

### 2. MongoDB Express (Web)
Si usas docker-compose con mongo-express:
- Visitar: `http://localhost:8081`

### 3. Comando de línea (mongosh)
```bash
# Conectar desde el contenedor
docker exec -it mongodb-todoapp mongosh

# Comandos básicos
use todo_app
db.tareas.find().pretty()
db.tareas.countDocuments()
```

## 🚨 Solución de Problemas

### Error: "Puerto 27017 ya en uso"
```bash
# Ver qué proceso usa el puerto
lsof -i :27017

# Parar MongoDB local si está ejecutándose
brew services stop mongodb-community
# o
sudo systemctl stop mongod
```

### Error: "Cannot connect to Docker daemon"
```bash
# Asegurar que Docker Desktop esté ejecutándose
open -a Docker  # macOS
# o iniciar Docker Desktop manualmente
```

### Error: "No space left on device"
```bash
# Limpiar imágenes no usadas
docker system prune -a

# Limpiar volúmenes no usados
docker volume prune
```

### MongoDB no inicia
```bash
# Ver logs detallados
docker logs mongodb-todoapp

# Reiniciar contenedor
docker restart mongodb-todoapp
```

## ✨ Tips y Mejores Prácticas

### Para Desarrollo
1. **Usa docker-compose** - Más fácil de manejar
2. **Persist datos** - Usar volúmenes para no perder datos
3. **Nombra contenedores** - Facilita la administración
4. **Variables de entorno** - Para diferentes configuraciones

### Para Producción
1. **Usa autenticación** - Nunca sin credenciales
2. **Limita recursos** - CPU y memoria
3. **Backups regulares** - Volúmenes persistentes
4. **Monitoreo** - Logs y métricas

### Comandos de Mantenimiento
```bash
# Backup de datos
docker exec mongodb-todoapp mongodump --out /data/backup

# Restaurar backup
docker exec mongodb-todoapp mongorestore /data/backup

# Ver uso de espacio
docker system df
```

## 🎯 Resumen para la Clase

**Para estudiantes principiantes:**
1. Usar Docker Compose es la forma más simple
2. MongoDB Memory Server para pruebas
3. Docker para desarrollo, no para testing
4. Siempre verificar que Docker esté ejecutándose

**Comando esencial:**
```bash
# Todo en uno para empezar a trabajar
docker run --name mongodb-todoapp -p 27017:27017 -d mongo:latest
```
