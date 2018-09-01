'use strict';

// Carga de la libería mongoose
const mongoose = require('mongoose');

// Definir esquema
const filmSchema = mongoose.Schema({
    id: Number,
    title: String,
    subtitle: String,
    episode: String,
    film: String,
    opening_crawl: String,
    director: String,
    producer: String,
    release_date: String,
    characters: [String],
    planets: [String],
    starships: [String],
    vehicles: [String],
    species: [String],
    url: String,
    image: String
});


// Indice a los campos
filmSchema.index({ id: 1 });
filmSchema.index({ title: 1 });
filmSchema.index({ subtitle: 1 });
filmSchema.index({ episode: 1 });
filmSchema.index({ film: 1 });
filmSchema.index({ opening_crawl: 1 });
filmSchema.index({ director: 1 });
filmSchema.index({ producer: 1 });
filmSchema.index({ release_date: 1 });
filmSchema.index({ characters: 1 });
filmSchema.index({ planets: 1 });
filmSchema.index({ starships: 1 });
filmSchema.index({ vehicles: 1 });
filmSchema.index({ species: 1 });
filmSchema.index({ url: 1 });


// Método estático: Lo tiene el modelo, no la instancia
filmSchema.statics.list = function(filter, skip, limit, fields, sort) {

    // Crear query sin ejecutarla
    const query = Film.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields); // Todos los campos
    query.sort(sort); // Antes que en el paginado en la URL

    // Ejecutar query y devuelve una promesa
    return query.exec();
}

// Generar el modelo
const Film = mongoose.model('Film', filmSchema);

// Exportamos el módulo
module.exports = Film;