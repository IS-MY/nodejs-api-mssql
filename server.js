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

var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
//var jwt = require('jsonwebtoken');

/**
 * Get port from environment and store in Express.
 */

var env = process.env.NODE_ENV || 'dev';
var port = process.env.PORT || config.app.port;
var host = process.env.HOST || config.app.host;


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

// Configure the Bearer strategy for use by Passport.
//
// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
passport.use(new Strategy(
    function (token, cb) {
        db.users.findByToken(token, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));

// Initialize passport for use
//app.use(passport.initialize());  
// And now we can import our JWT passport strategy. Enter this below our mongoose connection:

// Bring in defined Passport Strategy
//require('./passport/passport')(passport, config);  
// Now we can start on our routes. We will start by creating the route group called apiRoutes. We will now be working down without jumping all over the place in the code. That said, this goes beneath the passport strategy import we just did:



//console.log(process.env);
//console.log("env ENV: [%s]", process.env.ENV);
//console.log("env NODE_ENV: [%s]", process.env.NODE_ENV);

// database connection
var db = require('./db')

// add routes
require('./app/routes')(app, db, passport);

app.use(function (req, res, next) {
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