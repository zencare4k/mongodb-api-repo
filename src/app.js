const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const tareasRoutes = require('./routes/tareas');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// Use tareas routes
app.use('/tareas', tareasRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});