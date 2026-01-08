const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb'); 
require('dotenv').config(); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// Importing the route files
const contactRoutes = require('./routes/contacts');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const app = express();
const port = process.env.PORT || 8080; 
let db;

// Middleware
app.use(cors());
app.use(express.static('frontend'));
app.use(express.json());

// Root route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Professional data route (from the first activity)
app.get('/professional', async (req, res) => {
  try {
    const data = await db.collection('professionals').findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching professional data" });
  }
});

// Database connection function
async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('cse341'); 
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); 
  }
}

// Initialize database and start the server
connectDB().then(() => {
    // Mount the contacts routes
    app.use('/contacts', contactRoutes(db));

    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
});