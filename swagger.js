const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE341 Contacts Project API'
  },
  
  host: 'cse341-z2vv.onrender.com', 
  schemes: ['https'] 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);