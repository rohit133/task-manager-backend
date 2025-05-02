const routes = require('express').Router();

routes.use('/task', require('./Task/Task.routes'))

module.exports = routes;