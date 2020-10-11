const express = require('express');
const routes = express.Router();

const AuthenticationController = require('./controllers/AuthenticationController');
const ServicesController = require('./controllers/ServicesController');
const ServiceController = require('./controllers/ServiceController');
const CompanyController = require('./controllers/CompanyController');
const NotFoundController = require('./controllers/NotFoundController');

const AuthenticationMiddleware = require('./middlewares/AuthenticationMiddleware')

// Authentication Routes
routes.post('/authenticate', AuthenticationController)
// routes.post('/refresh', RefreshController);

// Service Routes
routes.get('/services', AuthenticationMiddleware, ServicesController);
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