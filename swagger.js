const swaggerJSDoc = require('swagger-jsdoc');

const options  = {
  definition: { 
    openapi: '3.0.0',
    info: {
      title: 'Task Tracker API',
      version: '1.0.0',
      description: 'API Documentation of task tracker app'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ],
    security: [
      {
        bearerAuth: [ ] 
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
