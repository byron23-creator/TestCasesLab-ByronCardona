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

describe('EJEMPLOS PRACTICOS DE PRUEBAS DE INTEGRACION', () => {

  // EJERCICIO 1: Implementar la prueba para crear una tarea
  test('TODO: POST /api/tareas crea una tarea', async () => {
    // PISTA:
    // 1. Define el objeto `nuevaTarea` con el `title`.
    // 2. Haz una petición `POST` usando `supertest`.
    // 3. Verifica el `statusCode` de la respuesta (debe ser 201).
    // 4. Asegúrate de que el cuerpo de la respuesta contenga el título y un `_id`.
    
    // Respuesta
    const nuevaTarea = { title: 'Tarea de prueba' };
    
    const res = await request(app)
      .post('/api/tareas')
      .send(nuevaTarea);
      
    expect(res.statusCode).toBe(201); // 201 Created es el código correcto para una creación exitosa.
    expect(res.body.title).toBe(nuevaTarea.title);
    expect(res.body._id).toBeDefined(); // Verificamos que la BD asignó un ID.
  });

  // EJERCICIO 2: Implementar la prueba para obtener todas las tareas
  test('TODO: GET /api/tareas devuelve todas las tareas', async () => {
    // PISTA:
    // 1. Crea varias tareas directamente en la base de datos usando `Tarea.create()`.
    // 2. Haz una petición `GET` a la API.
    // 3. Verifica el `statusCode` (200) y que el array devuelto tenga la longitud correcta.
    // 4. Asegúrate de que los títulos de las tareas en la respuesta coincidan con los que creaste.
    
    // Respeusta
    await Tarea.create({ title: 'Tarea 1' });
    await Tarea.create({ title: 'Tarea finalizada', completed: true });
    
    const res = await request(app).get('/api/tareas');
    
    expect(res.statusCode).toBe(200); // 200 OK para una consulta exitosa.
    expect(res.body).toHaveLength(2); // Debe devolver las dos tareas que creamos.
    expect(res.body[0].title).toBe('Tarea 1');
    expect(res.body[1].title).toBe('Tarea finalizada');
  });

  // EJERCICIO 3: Implementar la prueba para obtener una tarea específica
  test('TODO: GET /api/tareas/:id devuelve una tarea específica', async () => {
    // PISTA:
    // 1. Crea una tarea en la base de datos para obtener su `_id`.
    // 2. Haz una petición `GET` a la ruta dinámica `/api/tareas/:id`.
    // 3. Verifica el `statusCode` (200) y que el `title` de la respuesta coincida con el de la tarea que creaste.
    
    // Respuesta
    const tarea = await Tarea.create({ title: 'Buscar esta tarea' });

    const res = await request(app).get(`/api/tareas/${tarea._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Buscar esta tarea');
    expect(res.body._id).toBe(tarea._id.toString()); // El ID de la respuesta debe coincidir.
  });

  // ✅ EJERCICIO 4: Implementar la prueba para un ID inexistente
  test('TODO: GET /api/tareas/:id devuelve 404 para un ID inexistente', async () => {
    // PISTA:
    // 1. Crea un ID válido pero que no exista en la base de datos (por ejemplo, `new mongoose.Types.ObjectId()`).
    // 2. Haz una petición `GET` a la API con este ID.
    // 3. Verifica que la respuesta tenga un `statusCode` de 404.
    
    // Respuesta
    const idInexistente = new mongoose.Types.ObjectId();

    const res = await request(app).get(`/api/tareas/${idInexistente}`);

    expect(res.statusCode).toBe(404); // 404 Not Found es la respuesta esperada.
  });

  // EJERCICIO 5: Implementar la prueba para un campo requerido
  test('TODO: POST /api/tareas valida campos requeridos', async () => {
    // PISTA:
    // 1. Haz una petición `POST` con un objeto vacío o sin el campo `title`.
    // 2. Verifica el `statusCode` de error y que el cuerpo de la respuesta contenga un mensaje de validación.
    
    // Respuesta
    const tareaInvalida = { description: 'Esto no debería funcionar' }; // Sin `title`

    const res = await request(app).post('/api/tareas').send(tareaInvalida);

    expect(res.statusCode).toBe(400); // 400 Bad Request por datos incorrectos del cliente.
    expect(res.body.message).toBeDefined(); // La API debe informar qué salió mal.

    // Verificación de seguridad: nos aseguramos de que no se guardó nada en la BD.
    const tareas = await Tarea.find();
    expect(tareas).toHaveLength(0);
  });

  // EJERCICIO 6: Implementar la prueba para una lista vacía
  test('TODO: GET /api/tareas devuelve un array vacío cuando no hay tareas', async () => {
    // PISTA:
    // 1. Asegúrate de que no haya tareas en la base de datos (`afterEach` se encarga de esto).
    // 2. Haz una petición `GET`.
    // 3. Verifica que la respuesta tenga un `statusCode` de 200 y que el cuerpo sea un array vacío.
    
    // Respuesta
    const res = await request(app).get('/api/tareas');

    expect(res.statusCode).toBe(200); // Una lista vacía es una respuesta exitosa, no un error.
    expect(res.body).toBeInstanceOf(Array); // El cuerpo debe ser un array.
    expect(res.body).toHaveLength(0); // El array debe estar vacío.
  });
});