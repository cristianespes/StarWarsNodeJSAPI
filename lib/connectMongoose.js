'use strict'

// Cargamos la libería
const mongoose = require('mongoose');
// Variable conexión de conveniencia
const conn = mongoose.connection;

// Generamos un evento en caso de error
conn.on('error', err => {
    console.log('Error de MongoDB', err);
});

// Generamos un evento una única vez salte el evento open
conn.once('open', () => {
    console.log('Conectado a MongoDB en', conn.name);
});

// Indicamos donde debe conectarse
mongoose.connect('mongodb://localhost/starwarsapi', { useNewUrlParser: true, useCreateIndex: true });

// Exportamos el módulo
module.exports = conn;