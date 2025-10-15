# 🚀 Inicio Rápido - MongoDB con Docker

## Para Estudiantes - Pasos Mínimos

### 1. Verificar Docker
```bash
docker --version
```
Si no tienes Docker, descárgalo de: https://www.docker.com/products/docker-desktop

### 2. Iniciar MongoDB (Opción A - Simple)
```bash
npm run docker:mongo
```

### 2. Iniciar MongoDB (Opción B - Con Docker Compose)
```bash
npm run docker:up
```

### 3. Verificar que MongoDB está ejecutándose
```bash
docker ps
```
Deberías ver un contenedor con "mongo" ejecutándose.

### 4. Ejecutar la aplicación
```bash
npm run dev
```

### 5. Ejecutar pruebas
```bash
npm test
```

### 6. Al terminar, parar MongoDB
```bash
# Si usaste docker:mongo
docker stop mongodb-todoapp

# Si usaste docker:up
npm run docker:down
```

## 🆘 Solución de Problemas Comunes

### Error: "Cannot connect to Docker daemon"
- Abre Docker Desktop y espera que inicie completamente

### Error: "Port 27017 already in use"
```bash
docker stop $(docker ps -q --filter ancestor=mongo)
```

### Error: "Error: connect ECONNREFUSED"
- Verifica que MongoDB esté ejecutándose: `docker ps`
- Si no está, ejecuta: `npm run docker:mongo`

### MongoDB Express (Interfaz Web) - Opcional
Si usaste `docker:up`, puedes ver la base de datos en:
- URL: http://localhost:8081
- Usuario: admin
- Contraseña: admin123

## 📱 Comandos Útiles

```bash
# Ver contenedores ejecutándose
docker ps

# Ver logs de MongoDB
npm run docker:logs

# Limpiar todo (¡cuidado, borra datos!)
npm run docker:clean

# Reiniciar MongoDB
docker restart mongodb-todoapp
```
