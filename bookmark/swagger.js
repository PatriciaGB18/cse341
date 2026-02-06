const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bookmark Library API',
    description: 'API for managing books, authors, and genres in a library system.',
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);