'use strict'

var express = require('express');
var router = express.Router();

// Cargamos el modelo
const Starship = require('../../models/Starship');

/**
 * GET /
 * Recupera el listado completo de naves
 */
router.get('/', async function(req, res, next) {

  try {

    // Recogemos los parámetro de la query
    const name = req.query.name;
    const model = req.query.model;
    const manufacturer = req.query.manufacturer;
    const cost_in_credits = req.query.cost_in_credits;
    const length = req.query.length;
    const max_atmosphering_speed = req.query.max_atmosphering_speed;
    const crew = req.query.crew;
    const passengers = req.query.passengers;
    const cargo_capacity = req.query.cargo_capacity;
    const consumables = req.query.consumables;
    const hyperdrive_rating = req.query.hyperdrive_rating;
    const MGLT = req.query.MGLT;
    const starship_class = req.query.starship_class;

    const pilot = req.query.pilot;
    const episode = req.query.episode;

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

    if (model) {
      filter.model = new RegExp('^' + model, "i");
    }

    if (manufacturer) {
      filter.manufacturer = manufacturer;
    }

    if (cost_in_credits) {
      filter.cost_in_credits = cost_in_credits;
    }

    if (length) {
      filter.length = new RegExp('^' + length, "i");
    }

    if (max_atmosphering_speed) {
      filter.max_atmosphering_speed = new RegExp('^' + max_atmosphering_speed, "i");
    }

    if (crew) {
      filter.crew = new RegExp('^' + crew, "i");
    }

    if (passengers) {
      filter.passengers = new RegExp('^' + passengers, "i");
    }

    if (cargo_capacity) {
        filter.cargo_capacity = new RegExp('^' + cargo_capacity, "i");
    }

    if (consumables) {
        filter.consumables = new RegExp('^' + consumables, "i");
    }

    if (hyperdrive_rating) {
        filter.hyperdrive_rating = new RegExp('^' + hyperdrive_rating, "i");
    }

    if (MGLT) {
        filter.MGLT = new RegExp('^' + MGLT, "i");
    }

    if (starship_class) {
        filter.starship_class = new RegExp('^' + starship_class, "i");
    }


    if (pilot) {
      filter.pilots = { '$in': [ pilot ] };
    }

    if (episode) {
        filter.episodes = { '$in': [ episode ] };
      }

    // Almacenamos la búsqueda en la variable
    const starships = await Starship.list(filter, skip, limit, fields, sort); // list() es el método estático que hemos creado en el modelo

    // Si no hay error, devolvemos un json con el resultado
    res.json({ success: true, count: starships.length, result: starships });

  } catch(err) {
    // Controlamos el error en caso de haberlo
    next(err);
  }

});

/**
 * GET /:id
 * Recuperar una nave
 */
router.get('/:id', async function(req, res, next) {
  try {
    // Los datos que recibe el middleware
    const id = req.params.id;

    // Recogemos el parámetro de filtro de campos
    var fields = ' -_id -__v';

    // Busca el anuncio y lo actualiza
    const wantedStarship = await Starship.findOne({ id: id }, fields).exec();

    // Una vez modificado el anuncio, respondemos
    //res.json({ success: true, result: wantedStarship });
    res.json( wantedStarship );

  } catch(err) {
      next(err);
  }
});


/**
 * POST /
 * Crear una nave
 */
router.post('/', async (req, res, next) => {

  try {
    // Creamos un personaje en memoria
    const starship = new Starship(req.body);

    // Guardamos el personaje en la base de datos
    const savedStarship = starship.save();

    // Respondemos con el resultado
    res.json({ success: true, result: savedStarship});

  } catch(err) {
      next(err);
  }

});

/**
 * PUT /:id
 * Actualizar una nave
 */
router.put('/:id', async (req, res, next) => {
  try {
    // Los datos que recibe el middleware
    const id = req.params.id;
    const data = req.body;

    // Busca el anuncio y lo actualiza
    const modifiedStarship = await Starship.findOneAndUpdate({ id: id }, data, { new: true }).exec();
    // Añadimos { new: true } para que nos devuelva el agente una vez ya modificado

    // Una vez modificado el anuncio, respondemos
    res.json({ success: true, result: modifiedStarship});
  } catch(err) {
    next(err);
  }
});


/**
 * DELETE /
 * Eliminar una nave
 */
router.delete('/:id', async (req, res, next) => {
  try {
      const id = req.params.id;

      // Busca el personaje y lo elimina
      const deletedStarship = await Starship.deleteOne({ id: id }).exec();

      // Una vez borrado el anuncio, respondemos
      res.json({ success: true, result: deletedStarship });

  } catch(err) {
      next(err);
  }
});


module.exports = router;