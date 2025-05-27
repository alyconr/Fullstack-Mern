const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')


dotenv.config();
const app = express();


//Midlewares

app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth.routes')

//rutas

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});