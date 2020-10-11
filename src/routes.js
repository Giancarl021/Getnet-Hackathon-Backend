const express = require('express');
const routes = express.Router();

const AuthenticationController = require('./controllers/AuthenticationController');
const ServicesController = require('./controllers/ServicesController');
const ServiceController = require('./controllers/ServiceController');
const CompanyController = require('./controllers/CompanyController');

const MeController = require('./controllers/MeController');

const NotFoundController = require('./controllers/NotFoundController');

const AuthenticationMiddleware = require('./middlewares/AuthenticationMiddleware');
const RefreshMiddleware = require('./middlewares/RefreshMiddleware');

// Authentication Routes
routes.post('/authenticate', AuthenticationController)
routes.post('/refresh', RefreshMiddleware, AuthenticationController);

// Service Routes
routes.get('/services', AuthenticationMiddleware, ServicesController);
routes.get('/services/:id', AuthenticationMiddleware, ServiceController);
routes.post('/services/:id', AuthenticationMiddleware, );

// Company Routes
routes.get('/company/:cnpj', AuthenticationMiddleware, CompanyController);

// Profile Routes
routes.get('/me', AuthenticationMiddleware, MeController);

routes.get('/me/messages', AuthenticationMiddleware, );
routes.get('/me/messages/:from', AuthenticationMiddleware, );
routes.post('/me/messages/:to', AuthenticationMiddleware, );

routes.get('/me/service', AuthenticationMiddleware, );
routes.post('/me/service', AuthenticationMiddleware, );

routes.get('/me/purchases', AuthenticationMiddleware, );
routes.get('/me/sales', AuthenticationMiddleware, );
routes.get('/me/history', AuthenticationMiddleware, );

routes.get('/me/pending', AuthenticationMiddleware, )

routes.all('*', NotFoundController);

module.exports = routes;