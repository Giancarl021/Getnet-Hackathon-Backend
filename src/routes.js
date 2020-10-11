const express = require('express');
const routes = express.Router();

const ServicesController = require('./controllers/ServicesController');
const NotFoundController = require('./controllers/NotFound');

routes.get('/services', ServicesController);

routes.all('*', NotFoundController);

module.exports = routes;