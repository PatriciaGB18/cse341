const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb'); 
require('dotenv').config(); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// 1. Inicialize o app primeiro
const app = express();

// 2. Defina a porta e variáveis globais
const port = process.env.PORT || 8080; 
let db;

// 3. Importe as rotas
const contactRoutes = require('./routes/contacts');

// 4. Middlewares Globais
app.use(cors());
app.use(express.static('frontend'));
app.use(express.json());

// 5. Configuração do Swagger (Agora o 'app' já existe!)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 6. Rotas principais
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/professional', async (req, res) => {
  try {
    const data = await db.collection('professionals').findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching professional data" });
  }
});

// 7. Função de conexão com o banco
async function connectDB() {
  try {
    // Certifique-se que MONGODB_URI está nas Environment Variables do Render
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('cse341'); 
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); 
  }
}

// 8. Inicialização
connectDB().then(() => {
    // Monta as rotas de contatos passando o db
    app.use('/contacts', contactRoutes(db));

    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
});