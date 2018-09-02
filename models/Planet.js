'use strict';

// Carga de la libería mongoose
const mongoose = require('mongoose');

// Definir esquema
const planetSchema = mongoose.Schema({
    id: Number,
    name: String,
    rotation_period: String,
    orbital_period: String,
    diameter: String,
    climate: String,
    gravity: String,
    terrain: String,
    surface_water: String,
    population: String,
    residents: [String],
    films: [String],
    url: String,
    image: String
});


// Indice a los campos
planetSchema.index({ id: 1 });
planetSchema.index({ name: 1 });
planetSchema.index({ rotation_period: 1 });
planetSchema.index({ orbital_period: 1 });
planetSchema.index({ diameter: 1 });
planetSchema.index({ climate: 1 });
planetSchema.index({ gravity: 1 });
planetSchema.index({ terrain: 1 });
planetSchema.index({ surface_water: 1 });
planetSchema.index({ population: 1 });
planetSchema.index({ residents: 1 });
planetSchema.index({ films: 1 });
planetSchema.index({ url: 1 });


// Método estático: Lo tiene el modelo, no la instancia
planetSchema.statics.list = function(filter, skip, limit, fields, sort) {

    // Crear query sin ejecutarla
    const query = Planet.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields); // Todos los campos
    query.sort(sort); // Antes que en el paginado en la URL

    // Ejecutar query y devuelve una promesa
    return query.exec();
}

// Generar el modelo
const Planet = mongoose.model('Planet', planetSchema);

// Exportamos el módulo
module.exports = Planet;