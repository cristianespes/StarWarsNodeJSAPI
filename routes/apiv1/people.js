'use strict'

var express = require('express');
var router = express.Router();

// Cargamos el modelo
const Character = require('../../models/Character');

/**
 * GET /
 * Recupera el listado completo de personajes
 */
router.get('/', async function(req, res, next) {

  try {

    // Recogemos los parámetro de la query
    const name = req.query.name;
    const height = req.query.height;
    const mass = req.query.mass;
    const hair_color = req.query.hair_color;
    const skin_color = req.query.skin_color;
    const eye_color = req.query.eye_color;
    const birth_year = req.query.birth_year;
    const gender = req.query.gender;
    const homeworld = req.query.homeworld;

    const episode = req.query.episode;
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
    if (name) {
      filter.name = new RegExp('^' + name, "i");
    }

    if (height) {
      filter.height = height;
    }

    if (mass) {
      filter.mass = mass;
    }

    if (hair_color) {
      filter.hair_color = new RegExp('^' + hair_color, "i");
    }

    if (skin_color) {
      filter.skin_color = new RegExp('^' + skin_color, "i");
    }

    if (eye_color) {
      filter.eye_color = new RegExp('^' + eye_color, "i");
    }

    if (birth_year) {
      filter.birth_year = new RegExp('^' + birth_year, "i");
    }

    if (gender) {
      filter.gender = new RegExp('^' + gender, "i");
    }

    if (homeworld) {
      filter.homeworld = new RegExp('^' + homeworld, "i");
    }


    if (episode) {
      console.log("valor de episode: " + episode);
      filter.episodes = { '$in': [ episode ] };
      console.log("valor de filter.starships: " + filter.starships);
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
    const people = await Character.list(filter, skip, limit, fields, sort); // list() es el método estático que hemos creado en el modelo

    // Si no hay error, devolvemos un json con el resultado
    res.json({ success: true, count: people.length, result: people });

  } catch(err) {
    // Controlamos el error en caso de haberlo
    next(err);
  }

});

/**
 * GET /:id
 * Recuperar un personaje
 */
router.get('/:id', async function(req, res, next) {
  try {
    // Los datos que recibe el middleware
    const id = req.params.id;

    // Recogemos el parámetro de filtro de campos
    var fields = ' -_id -__v';

    // Busca el anuncio y lo actualiza
    const wantedCharacter = await Character.findOne({ id: id }, fields).exec();

    // Una vez modificado el anuncio, respondemos
    //res.json({ success: true, result: wantedCharacter });
    res.json( wantedCharacter );

  } catch(err) {
      next(err);
  }
});


/**
 * POST /
 * Crear un personaje
 */
router.post('/', async (req, res, next) => {

  try {
    // Creamos un personaje en memoria
    const character = new Character(req.body);

    // Guardamos el personaje en la base de datos
    const savedCharacter = character.save();

    // Respondemos con el resultado
    res.json({ success: true, result: savedCharacter});

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
    const modifiedCharacter = await Character.findOneAndUpdate({ id: id }, data, { new: true }).exec();
    // Añadimos { new: true } para que nos devuelva el agente una vez ya modificado

    // Una vez modificado el anuncio, respondemos
    res.json({ success: true, result: modifiedCharacter});
  } catch(err) {
    next(err);
  }
});


/**
 * DELETE /
 * Eliminar un personaje
 */
router.delete('/:id', async (req, res, next) => {
  try {
      const id = req.params.id;

      // Busca el personaje y lo elimina
      const deletedCharacter = await Character.deleteOne({ id: id }).exec();

      // Una vez borrado el anuncio, respondemos
      res.json({ success: true, result: deletedCharacter });

  } catch(err) {
      next(err);
  }
});


module.exports = router;