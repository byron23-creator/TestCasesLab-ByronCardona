const express = require('express');
const tareasRouter = require('./routes/tareas');
const app = express();

app.use(express.json());
app.use('/api/tareas', tareasRouter);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;