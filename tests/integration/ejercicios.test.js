const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Tarea = require('../../src/models/tarea.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Tarea.deleteMany();
});

describe('🎓 EJERCICIOS PARA ESTUDIANTES', () => {

    // EJERCICIO 1: Completar esta prueba

  
  test("TODO: Implementar PUT /api/tareas/:id - actualizar tarea", async () => {
    // 1. Crear una tarea
    const tarea = await Tarea.create({ title: "Tarea original" });
    
    // 2. Hacer PUT con datos actualizados
    const res = await request(app)
      .put(`/api/tareas/${tarea._id}`)
      .send({ title: "Tarea actualizada", completed: true });
  
    // 3. Verificar la respuesta de la API
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Tarea actualizada");
    expect(res.body.completed).toBe(true);
  
    // 4. VERIFICACIÓN FALTANTE: Comprobar en la base de datos
    const tareaEnDB = await Tarea.findById(tarea._id);
    expect(tareaEnDB.title).toBe("Tarea actualizada");
    expect(tareaEnDB.completed).toBe(true);
  });

  // EJERCICIO 2: Completar esta prueba
  test('TODO: Implementar DELETE /api/tareas/:id - eliminar tarea', async () => {
    // PISTA:
    // 1. Crear una tarea
    // 2. Hacer DELETE
    // 3. Verificar que se eliminó (404 en GET)
    
    expect(true).toBe(true); // Placeholder - ¡reemplazar!
  });

  // EJERCICIO 3: Prueba de validación
  test('TODO: POST /api/tareas con title vacío debe fallar', async () => {
    // PISTA: Enviar { title: "" } y verificar error
    expect(true).toBe(true); // Placeholder - ¡reemplazar!
  });

  // EJERCICIO 4: Prueba con múltiples tareas
  test('TODO: GET /api/tareas debe devolver tareas ordenadas por fecha', async () => {
    // PISTA:
    // 1. Crear varias tareas con delays
    // 2. Verificar orden en la respuesta
    expect(true).toBe(true); // Placeholder - ¡reemplazar!
  });

  // EJERCICIO 5: Prueba de edge case
  test('TODO: GET /api/tareas/:id con ID inválido debe devolver 500', async () => {
    // PISTA: Usar un ID que no sea ObjectId válido (ej: "123")
    expect(true).toBe(true); // Placeholder - ¡reemplazar!
  });
});
