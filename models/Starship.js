'use strict';

// Carga de la libería mongoose
const mongoose = require('mongoose');

// Definir esquema
const starshipSchema = mongoose.Schema({
    id: Number,
    name: String,
    model: String,
    manufacturer: String,
    cost_in_credits: String,
    length: String,
    max_atmosphering_speed: String,
    crew: String,
    passengers: String,
    cargo_capacity: String,
    consumables: String,
    hyperdrive_rating: String,
    MGLT: String,
    starship_class: String,
    pilots: [String],
    episodes: [String],
    url: String,
    image: String
});


// Indice a los campos
starshipSchema.index({ id: 1 });
starshipSchema.index({ name: 1 });
starshipSchema.index({ model: 1 });
starshipSchema.index({ manufacturer: 1 });
starshipSchema.index({ cost_in_credits: 1 });
starshipSchema.index({ length: 1 });
starshipSchema.index({ max_atmosphering_speed: 1 });
starshipSchema.index({ crew: 1 });
starshipSchema.index({ passengers: 1 });
starshipSchema.index({ cargo_capacity: 1 });
starshipSchema.index({ consumables: 1 });
starshipSchema.index({ hyperdrive_rating: 1 });
starshipSchema.index({ MGLT: 1 });
starshipSchema.index({ starship_class: 1 });
starshipSchema.index({ pilots: 1 });
starshipSchema.index({ episodes: 1 });
starshipSchema.index({ url: 1 });


// Método estático: Lo tiene el modelo, no la instancia
starshipSchema.statics.list = function(filter, skip, limit, fields, sort) {

    // Crear query sin ejecutarla
    const query = Starship.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields); // Todos los campos
    query.sort(sort); // Antes que en el paginado en la URL

    // Ejecutar query y devuelve una promesa
    return query.exec();
}

// Generar el modelo
const Starship = mongoose.model('Starship', starshipSchema);

// Exportamos el módulo
module.exports = Starship;