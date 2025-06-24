const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notas API',
      version: '1.0.0',
      description: 'Documentación de la API para la app de notas con autenticación JWT',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // rutas donde se agregarán las anotaciones
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
