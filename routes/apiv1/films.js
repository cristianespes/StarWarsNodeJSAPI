'use strict'

var express = require('express');
var router = express.Router();

// Cargamos el modelo
const Film = require('../../models/Film');

/**
 * GET /
 * Recupera el listado completo de películas
 */
router.get('/', async function(req, res, next) {

  try {

    // Recogemos los parámetro de la query
    const title = req.query.title;
    const subtitle = req.query.subtitle;
    const episode = req.query.episode;
    const film = req.query.film;
    const opening_crawl = req.query.opening_crawl;
    const director = req.query.director;
    const producer = req.query.producer;
    const release_date = req.query.release_date;

    const character = req.query.character;
    const planet = req.query.planet;
    const specie = req.query.specie;
    const vehicle = req.query.vehicle;
    const starship = req.query.starship;

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
    if (title) {
      filter.title = new RegExp('^' + title, "i");
    }

    if (subtitle) {
      filter.subtitle = new RegExp('^' + subtitle, "i");
    }

    if (episode) {
      filter.episode = episode;
    }

    if (film) {
      filter.film = film;
    }

    if (opening_crawl) {
      filter.opening_crawl = new RegExp('^' + opening_crawl, "i");
    }

    if (director) {
      filter.director = new RegExp('^' + director, "i");
    }

    if (producer) {
      filter.producer = new RegExp('^' + producer, "i");
    }

    if (release_date) {
      filter.release_date = new RegExp('^' + release_date, "i");
    }


    if (character) {
      filter.characters = { '$in': [ character ] };
    }

    if (planet) {
        filter.planets = { '$in': [ planet ] };
      }

    if (specie) {
      filter.species = { '$in': [ specie ] };
    }

    if (vehicle) {
      filter.vehicles = { '$in': [ vehicle ] };
    }

    if (starship) {
      filter.starships = { '$in': [ starship ] };
    }

    // Almacenamos la búsqueda en la variable
    const films = await Film.list(filter, skip, limit, fields, sort); // list() es el método estático que hemos creado en el modelo

    // Si no hay error, devolvemos un json con el resultado
    res.json({ success: true, count: films.length, result: films });

  } catch(err) {
    // Controlamos el error en caso de haberlo
    next(err);
  }

});

/**
 * GET /:id
 * Recuperar una película
 */
router.get('/:id', async function(req, res, next) {
  try {
    // Los datos que recibe el middleware
    const id = req.params.id;

    // Recogemos el parámetro de filtro de campos
    var fields = ' -_id -__v';

    // Busca el anuncio y lo actualiza
    const wantedFilm = await Film.findOne({ id: id }, fields).exec();

    // Una vez modificado el anuncio, respondemos
    //res.json({ success: true, result: wantedFilm });
    res.json( wantedFilm );

  } catch(err) {
      next(err);
  }
});


/**
 * POST /
 * Crear una película
 */
router.post('/', async (req, res, next) => {

  try {
    // Creamos un personaje en memoria
    const film = new Film(req.body);

    // Guardamos el personaje en la base de datos
    const savedFilm = film.save();

    // Respondemos con el resultado
    res.json({ success: true, result: savedFilm});

  } catch(err) {
      next(err);
  }

});

/**
 * PUT /:id
 * Actualizar un personaje
 */
router.put('/:id', async (req, res, next) => {
  try {
    // Los datos que recibe el middleware
    const id = req.params.id;
    const data = req.body;

    // Busca el anuncio y lo actualiza
    const modifiedFilm = await Film.findOneAndUpdate({ id: id }, data, { new: true }).exec();
    // Añadimos { new: true } para que nos devuelva el agente una vez ya modificado

    // Una vez modificado el anuncio, respondemos
    res.json({ success: true, result: modifiedFilm});
  } catch(err) {
    next(err);
  }
});


/**
 * DELETE /
 * Eliminar una película
 */
router.delete('/:id', async (req, res, next) => {
  try {
      const id = req.params.id;

      // Busca el personaje y lo elimina
      const deletedFilm = await Film.deleteOne({ id: id }).exec();

      // Una vez borrado el anuncio, respondemos
      res.json({ success: true, result: deletedFilm });

  } catch(err) {
      next(err);
  }
});


module.exports = router;