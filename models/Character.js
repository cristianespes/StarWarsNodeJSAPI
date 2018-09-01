'use strict';

// Carga de la libería mongoose
const mongoose = require('mongoose');

// Definir esquema
const characterSchema = mongoose.Schema({
    id: Number,
    name: String,
    height: String,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: String,
    homeworld: String,
    episodes: [String],
    species: [String],
    vehicles: [String],
    starships: [String],
    url: String,
    image: String
});


// Indice a los campos
characterSchema.index({ id: 1 });
characterSchema.index({ name: 1 });
characterSchema.index({ height: -1 });
characterSchema.index({ mass: 1 });
characterSchema.index({ hair_color:1 });
characterSchema.index({ skin_color: 1 });
characterSchema.index({ eye_color: 1 });
characterSchema.index({ birth_year: 1 });
characterSchema.index({ gender: 1 });
characterSchema.index({ homeworld: 1 });
characterSchema.index({ episodes: 1 });
characterSchema.index({ species: 1 });
characterSchema.index({ vehicles: 1 });
characterSchema.index({ starships: 1 });
characterSchema.index({ url: 1 });


// Método estático: Lo tiene el modelo, no la instancia
characterSchema.statics.list = function(filter, skip, limit, fields, sort) {

    // Crear query sin ejecutarla
    const query = Character.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields); // Todos los campos
    //query.select(fields + ' -_id -__v'); // Así decido yo si no deben ver algún campo (debe incluir el espacio)
    query.sort(sort); // Antes que en el paginado en la URL

    // Ejecutar query y devuelve una promesa
    return query.exec();
}

// Generar el modelo
const Character = mongoose.model('Character', characterSchema);

// Exportamos el módulo
module.exports = Character;