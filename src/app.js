const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./services/error-handler')

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(ErrorHandler);

module.exports = app;