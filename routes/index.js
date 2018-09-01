var express = require('express');
var router = express.Router();

// Cargamos el módulo de validaciones una vez instalado
const { query, validationResult } = require('express-validator/check'); // Solo extraiga estas variables del objeto que está cargando
/*
const expressValidator = require('express-validator/check');
const query = expressValidator.query;
const validationResult = expressValidator.validationResult;
*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Star Wars API' });
});

router.get('/enquerystring', [
  query('age').isNumeric().withMessage('must be numeric')
], (req, res, next) => {
  validationResult(req).throw();
  console.log('req.query', req.query);
  res.send('ok'); // Para web
  //res.send( { success: true, result: 'ok' } ); // para API
  //res.json( { success: true, result: 'ok' } );
});

module.exports = router;
