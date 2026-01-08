const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE341 Contacts Project API'
  },
  host: 'https://cse341-z2vv.onrender.com',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);