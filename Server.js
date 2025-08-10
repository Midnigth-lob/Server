// server.js
const express = require('express');
const app = express();
const port = 3000;

// Usamos un Set para guardar keys válidas
const validKeys = new Set();

// Permitir CORS para pruebas (importante si frontend y backend están en dominios distintos)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Ruta para registrar una key nueva (desde frontend)
app.get('/register', (req, res) => {
  const key = req.query.key;
  if (!key) {
    return res.status(400).json({ success: false, message: "No se envió key" });
  }
  validKeys.add(key);
  return res.json({ success: true, message: "Key registrada" });
});

// Ruta para verificar una key
app.get('/verify', (req, res) => {
  const key = req.query.key;
  if (!key) {
    return res.status(400).json({ valid: false, message: "No se envió key" });
  }

  if (validKeys.has(key)) {
    return res.json({ valid: true });
  } else {
    return res.json({ valid: false });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
