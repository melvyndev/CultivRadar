const express = require('express');
const path = require('path');

const app = express();

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

module.exports = app;