const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;

app.use(cors());


app.use(express.static('frontend')); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/professional', (req, res) => {
  res.json({
    professionalName: "Patrícia GB",
    base64Image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", 
    nameLink: { 
      firstName: "Patrícia", 
      url: "https://github.com/PatriciaGB18" 
    },
    primaryDescription: " is a Backend Developer Student.",
    workDescription1: "Experiência em Node.js e APIs REST.",
    workDescription2: "Atualmente estudando na cse341.",
    linkTitleText: "Social Links",
    linkedInLink: { 
      text: "LinkedIn", 
      link: "https://linkedin.com/in/seu-perfil" 
    },
    githubLink: { 
      text: "GitHub", 
      link: "https://github.com/PatriciaGB18" 
    },
    contactText: "Contact me at: email@example.com"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});