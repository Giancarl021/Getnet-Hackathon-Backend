const express = require('express');
const routes = express.Router();

const AuthenticationController = require('./controllers/AuthenticationController');
const ServicesController = require('./controllers/ServicesController');
const ServiceController = require('./controllers/ServiceController');
const RequireServiceController = require('./controllers/RequireServiceController');
const CompanyController = require('./controllers/CompanyController');
const MeController = require('./controllers/MeController');
const MyMessagesController = require('./controllers/MyMessagesController');
const MyMessagesWithController = require('./controllers/MyMessagesWithController');
const SendMessageController = require('./controllers/SendMessageController');
const MyServiceController = require('./controllers/MyServiceController');
const CreateServiceController = require('./controllers/CreateServiceController');
const MyPurchasesController = require('./controllers/MyPurchasesController');
const MySalesController = require('./controllers/MySalesController');
const MyPendingTradesController = require('./controllers/MyPendingTradesController');
const MyHistoryController = require('./controllers/MyHistoryController');

const NotFoundController = require('./controllers/NotFoundController');
const GetNetAuthenticationController = require('./controllers/GetNetAuthenticationController')

const AuthenticationMiddleware = require('./middlewares/AuthenticationMiddleware');
const RefreshMiddleware = require('./middlewares/RefreshMiddleware');
;

// Authentication Routes
routes.post('/authenticate', AuthenticationController);
routes.post('/refresh', RefreshMiddleware, AuthenticationController);

// Service Routes
routes.get('/services', AuthenticationMiddleware, ServicesController);
routes.get('/services/:id', AuthenticationMiddleware, ServiceController);
routes.post('/services/:id', AuthenticationMiddleware, RequireServiceController);

// Company Routes
routes.get('/company/:cnpj', AuthenticationMiddleware, CompanyController);

// Exchange Routes

// routes.post('/exchange');

// Profile Routes
routes.get('/me', AuthenticationMiddleware, MeController);

routes.get('/me/messages', AuthenticationMiddleware, MyMessagesController);
routes.get('/me/messages/:with', AuthenticationMiddleware, MyMessagesWithController);
routes.post('/me/messages/:to', AuthenticationMiddleware, SendMessageController);

routes.get('/me/service', AuthenticationMiddleware, MyServiceController);
routes.put('/me/service', AuthenticationMiddleware, CreateServiceController);
routes.post('/me/service', AuthenticationMiddleware, );

routes.get('/me/purchases', AuthenticationMiddleware, MyPurchasesController);
routes.get('/me/sales', AuthenticationMiddleware, MySalesController);
routes.get('/me/history', AuthenticationMiddleware, MyHistoryController);

routes.get('/me/pending', AuthenticationMiddleware, MyPendingTradesController);

// Getnet Authentication
routes.get('/getnet-authentication', AuthenticationMiddleware, GetNetAuthenticationController);

routes.all('*', AuthenticationMiddleware, NotFoundController);

module.exports = routes;