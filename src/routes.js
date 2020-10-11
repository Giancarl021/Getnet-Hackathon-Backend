const express = require('express');
const routes = express.Router();

const AuthenticationController = require('./controllers/AuthenticationController');
const ServicesController = require('./controllers/ServicesController');
const ServiceController = require('./controllers/ServiceController');
const CompanyController = require('./controllers/CompanyController');
const MeController = require('./controllers/MeController');
const MyMessagesController = require('./controllers/MyMessagesController');
const MyMessagesWithController = require('./controllers/MyMessagesWithController');
const SendMessageController = require('./controllers/SendMessageController');
const MyServiceController = require('./controllers/MyServiceController');

const NotFoundController = require('./controllers/NotFoundController');

const AuthenticationMiddleware = require('./middlewares/AuthenticationMiddleware');
const RefreshMiddleware = require('./middlewares/RefreshMiddleware');


// Authentication Routes
routes.post('/authenticate', AuthenticationController);
routes.post('/refresh', RefreshMiddleware, AuthenticationController);

// Service Routes
routes.get('/services', AuthenticationMiddleware, ServicesController);
routes.get('/services/:id', AuthenticationMiddleware, ServiceController);
routes.post('/services/:id', AuthenticationMiddleware, );

// Company Routes
routes.get('/company/:cnpj', AuthenticationMiddleware, CompanyController);

// routes.post('/exchange');

// Profile Routes
routes.get('/me', AuthenticationMiddleware, MeController);

routes.get('/me/messages', AuthenticationMiddleware, MyMessagesController);
routes.get('/me/messages/:with', AuthenticationMiddleware, MyMessagesWithController);
routes.post('/me/messages/:to', AuthenticationMiddleware, SendMessageController);

routes.get('/me/service', AuthenticationMiddleware, MyServiceController);
routes.put('/me/service', AuthenticationMiddleware, );
routes.post('/me/service', AuthenticationMiddleware, );

routes.get('/me/purchases', AuthenticationMiddleware, );
routes.get('/me/sales', AuthenticationMiddleware, );
routes.get('/me/history', AuthenticationMiddleware, );

routes.get('/me/pending', AuthenticationMiddleware, );

routes.all('*', AuthenticationMiddleware, NotFoundController);

module.exports = routes;