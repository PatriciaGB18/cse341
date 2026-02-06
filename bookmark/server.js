const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Bookmark Library API is running');
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});