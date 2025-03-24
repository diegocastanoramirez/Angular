const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

// Habilitar compresión para mejorar el rendimiento
app.use(compression());

// Servir los archivos estáticos de Angular
const distPath = path.join(__dirname, 'dist/app-name/browser'); // Ajusta si es necesario
app.use(express.static(distPath));

// Manejar cualquier ruta y redirigir a index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Definir el puerto (Azure proporciona uno dinámico)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
