const express = require('express');
const routes = express.Router();

const ServicesController = require('./controllers/ServicesController');
const ServiceController = require('./controllers/ServiceController');
const CompanyController = require('./controllers/CompanyController');
const NotFoundController = require('./controllers/NotFound');

// Service Routes
routes.get('/services', ServicesController);
routes.get('/services/:id', ServiceController);

// Company Routes
routes.get('/company/:cnpj', CompanyController);


// routes.get('/me');
// routes.get('/me/messages');
// routes.get('/me/service');
// routes.get('/me/purchases');
// routes.get('/me/sales');
// routes.get('/me/history');

routes.all('*', NotFoundController);

module.exports = routes;