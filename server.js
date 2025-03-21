const express = require('express');
const path = require('path');

const app = express();

// Configurar el servidor para servir archivos estáticos desde Angular
app.use(express.static(path.join(__dirname, 'dist/project-angular/browser')));

// Manejar cualquier ruta y redirigir a index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/project-angular/browser/index.html'));
});

// Definir el puerto (usar el puerto de Azure o 8080 por defecto)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
