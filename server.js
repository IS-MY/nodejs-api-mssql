#!/usr/bin/env node

/**
 * Module dependencies.
 */
'use strict';

var express = require('express'),
    app = express(),
    router = express.Router(),
    http = require('http'),
    config = require('config'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    sprintf = require("sprintf-js").sprintf;

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || config.app.port;
var host = process.env.HOST || config.app.host;
var env = process.env.ENV || config.app.env || 'dev';

// Set environment variables
app.set('port', port);
app.set('host', host);
app.set('env', env);

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
console.log('Environment: %s', env);


// database connection
var db = require('./db')

// add routes
require('./app/routes')(app, db);

app.use(function(req, res, next) {
    res.status(404).send('404 page');
});

// Start http listener on host and port
http.createServer(app).listen(app.get('port'), app.get('host'), function () {
    console.log(sprintf("Express server listening on port [%i] on host [%s]", app.get('port'), app.get('host')));
    if (app.get('port') != 443) {
        console.log(sprintf("Use http://%s:%i", app.get('host'), app.get('port')));
    } else {
        console.log(sprintf("Use https://%s:%i", app.get('host'), app.get('port')));
    }
});

module.exports = app;