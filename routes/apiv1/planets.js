'use strict'

var express = require('express');
var router = express.Router();

// Cargamos el modelo
const Planet = require('../../models/Planet');

/**
 * GET /
 * Recupera el listado completo de planetas
 */
router.get('/', async function(req, res, next) {

  try {

    // Recogemos los parámetro de la query
    const name = req.query.name;
    const rotation_period = req.query.rotation_period;
    const orbital_period = req.query.orbital_period;
    const diameter = req.query.diameter;
    const climate = req.query.climate;
    const gravity = req.query.gravity;
    const terrain = req.query.terrain;
    const surface_water = req.query.surface_water;
    const population = req.query.population;

    const resident = req.query.resident;
    const film = req.query.film;

    // Recogemos los parámetros de skip & limit
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    // Recogemos el parámetro de filtro de campos
    var fields;
    if (req.query.fields) {
      fields = req.query.fields + ' -_id';
      console.log(fields);
    } else {
      fields = ' -_id -__v';
    }

    // Recogemos el orden
    const sort = req.query.sort;

    // Creamos un filtro vacío para los parámetros que nos den
    const filter = {};
    
    // Solo añadir el filtro cuando se solicite
    if (name) {
      filter.name = new RegExp('^' + name, "i");
    }

    if (rotation_period) {
      filter.rotation_period = new RegExp('^' + rotation_period, "i");
    }

    if (orbital_period) {
      filter.orbital_period = orbital_period;
    }

    if (diameter) {
      filter.diameter = diameter;
    }

    if (climate) {
      filter.climate = new RegExp('^' + climate, "i");
    }

    if (gravity) {
      filter.gravity = new RegExp('^' + gravity, "i");
    }

    if (terrain) {
      filter.terrain = new RegExp('^' + terrain, "i");
    }

    if (surface_water) {
      filter.surface_water = new RegExp('^' + surface_water, "i");
    }

    if (population) {
        filter.population = new RegExp('^' + population, "i");
    }


    if (resident) {
      filter.residents = { '$in': [ resident ] };
    }

    if (film) {
        filter.films = { '$in': [ film ] };
      }

    // Almacenamos la búsqueda en la variable
    const planets = await Planet.list(filter, skip, limit, fields, sort); // list() es el método estático que hemos creado en el modelo

    // Si no hay error, devolvemos un json con el resultado
    res.json({ success: true, count: planets.length, result: planets });

  } catch(err) {
    // Controlamos el error en caso de haberlo
    next(err);
  }

});

/**
 * GET /:id
 * Recuperar un planeta
 */
router.get('/:id', async function(req, res, next) {
  try {
    // Los datos que recibe el middleware
    const id = req.params.id;

    // Recogemos el parámetro de filtro de campos
    var fields = ' -_id -__v';

    // Busca el anuncio y lo actualiza
    const wantedPlanet = await Planet.findOne({ id: id }, fields).exec();

    // Una vez modificado el anuncio, respondemos
    //res.json({ success: true, result: wantedPlanet });
    res.json( wantedPlanet );

  } catch(err) {
      next(err);
  }
});


/**
 * POST /
 * Crear un planeta
 */
router.post('/', async (req, res, next) => {

  try {
    // Creamos un personaje en memoria
    const planet = new Planet(req.body);

    // Guardamos el personaje en la base de datos
    const savedPlanet = planet.save();

    // Respondemos con el resultado
    res.json({ success: true, result: savedPlanet});

  } catch(err) {
      next(err);
  }

});

/**
 * PUT /:id
 * Actualizar un planeta
 */
router.put('/:id', async (req, res, next) => {
  try {
    // Los datos que recibe el middleware
    const id = req.params.id;
    const data = req.body;

    // Busca el anuncio y lo actualiza
    const modifiedPlanet = await Planet.findOneAndUpdate({ id: id }, data, { new: true }).exec();
    // Añadimos { new: true } para que nos devuelva el agente una vez ya modificado

    // Una vez modificado el anuncio, respondemos
    res.json({ success: true, result: modifiedPlanet});
  } catch(err) {
    next(err);
  }
});


/**
 * DELETE /
 * Eliminar un planeta
 */
router.delete('/:id', async (req, res, next) => {
  try {
      const id = req.params.id;

      // Busca el personaje y lo elimina
      const deletedPlanet = await Planet.deleteOne({ id: id }).exec();

      // Una vez borrado el anuncio, respondemos
      res.json({ success: true, result: deletedPlanet });

  } catch(err) {
      next(err);
  }
});


module.exports = router;