const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bookmark Library API',
    description: 'API for managing books, authors, and genres in a library system.',
  },
  host: 'cse341-z2vv.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);