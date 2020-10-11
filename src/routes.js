const express = require('express');
const routes = express.Router();

const ServicesController = require('./controllers/ServicesController');
const ServiceController = require('./controllers/ServiceController');
const NotFoundController = require('./controllers/NotFound');

// Service Routes
routes.get('/services', ServicesController);
routes.get('/services/:id', ServiceController);

// routes.get('/me');
// routes.get('/me/service');
// routes.get('/me/purchases');
// routes.get('/me/sales');
// routes.get('/me/history');

routes.all('*', NotFoundController);

module.exports = routes;