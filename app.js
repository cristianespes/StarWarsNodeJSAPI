// Cargar librerias
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Cargar la aplicación
var app = express();

// Prepara el motor de vistas
app.set('views', path.join(__dirname, 'views')); // __dirname: Ruta actual
app.set('view engine', 'ejs');

/**
 * Conexión y modelos de mongoose
 */
require('./lib/connectMongoose');

// Middlewares de la app de propósito general
app.use(logger('dev'));
app.use(express.json()); // body de las peticiones, si es un JSON los parsee
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // parsear cookies
app.use(express.static(path.join(__dirname, 'public'))); // ficheros estáticos

/**
 * Rutas de mi api
 */
app.use('/apiv1/people',      require('./routes/apiv1/people'));
app.use('/apiv1/films',      require('./routes/apiv1/films'));

/**
 * Rutas de la aplicación web
 */
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // Envía el error 404 a error handler
});

// error handler - Toda petición que llegue aquí es porque ha ocurrido algún error
app.use(function(err, req, res, next) {

  // Comprobamos si ha habido algún error en la validación (modulo validation previamente instalado)
  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array( { onlyFirstError: true} )[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`
  }

  // Establecemos el status antes de responder, si aparece después, no aparecera el status correcto
  // render the error page
  res.status(err.status || 500);
  res.render('error');

  // Comprobamos si es una petición al API
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }


  // Esto devuelve los datos a una vista
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});

// Creamos la función para comprobar si es una petición al API
function isAPI(req) { // Devuelve true o false
  return req.originalUrl.indexOf('/apiv' === 0);
}

// Exportamos app, una instancia de Express a la que le hemos añadido cosas
module.exports = app;
