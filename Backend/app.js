const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const errorHandler = require('./middlewares/error.middleware')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger.config');




dotenv.config();
const app = express();


//Midlewares

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const authRoutes = require('./routes/auth.routes')
const notesRoutes = require('./routes/note.routes');

//rutas

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});