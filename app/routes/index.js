// routes/index.js

const noteRoutes = require('./note');

module.exports = function(app, db, passport) {
    noteRoutes(app, db, passport);
    // Other route groups could go here, in the future
};

