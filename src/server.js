const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/todo_app')
.then(() => {
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
})
.catch(err => console.error(err));