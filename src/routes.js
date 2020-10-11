const express = require('express');
const routes = express.Router();

const NotFoundController = require('./controllers/NotFound');



routes.all('*', NotFoundController);

module.exports = routes;