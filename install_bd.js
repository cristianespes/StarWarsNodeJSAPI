'use strict';

const fs = require('fs');
const path = require('path');
const Character = require('./models/Character');
const Film = require('./models/Film');

// Función para eliminar los documentos existentes de la colección
function deleteDocuments(documento) {
    return documento.deleteMany(function(err, removed) {
        if (err) {
            console.log('No ha sido posible eliminar los documentos:', err);
            return;
        }
        // where removed is the count of removed documents
        removed.n === 1 ? console.log(`Se ha eliminado ${removed.n} documento`) : console.log(`Se han eliminado ${removed.n} documentos`);
    });
}

// Función que retorna un array de objetos del fichero
function extractModels(nombreFichero) {
    return new Promise(resolve => {

        const fichero = path.join(__dirname, './models/', nombreFichero + '.json');

        fs.readFile(fichero, 'utf8', (err, data) => { // esta es la opción ASINCRONA! fs.readFile(path, 'utf8' (las opciones), callback);

            if (err) {
                console.log('No ha sido posible extraer los modelos', err);
                return;
            }

            const packageObject = JSON.parse(data);
            resolve(packageObject.documentos);
        });

    });
}

// Función para cargar los modelos en la base de datos del servidor MongoDB
const loadModels = async function() {
    try {
        // Conexión de Mongoose
        const conn = await require('./lib/connectMongoose');
        console.log('Conectado a la base de datos');

        // Eliminar documentos existentes de la colección
        await deleteDocuments(Character);
        await deleteDocuments(Film);
        console.log('Se han eliminado los documentos existentes');

        // Genera un array con todos los modelos
        const arrCharacters = await extractModels('people');
        // Guardar documento en la base de datos
        for (const character of arrCharacters) {
            const saveCharacter = new Character(character);
            await saveCharacter.save();
        }
        // Genera un array con todos los modelos
        const arrFilms = await extractModels('films');
        // Guardar documento en la base de datos
        for (const film of arrFilms) {
            const saveFilm = new Film(film);
            await saveFilm.save();
        }
        console.log('Se han guardado los documentos en la base de datos');

        // Se desconecta de la base de datos
        conn.close(function () {
            console.log('Mongoose connection disconnected');
        });

    } catch(err) {
        console.log('No ha sido posible cargar los documentos en la base de datos. Error:', err);
    }
    
};

// Ejecutamos la función
loadModels();