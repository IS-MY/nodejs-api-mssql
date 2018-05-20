var config = require('config');
const Sequelize = require('sequelize');
var dbConfig = config.get('app.db');
const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mssql',
    options: {
        encrypt: true
    },
    operatorsAliases: false,
    dialectOptions: {
        port: dbConfig.port
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        console.log('Connected to server [%s:%i] and [%s] database', dbConfig.host, dbConfig.port, dbConfig.database)
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
//db.user = require('./app/models/user')(sequelize, Sequelize);
db.note = require('./app/models/note')(sequelize, Sequelize);
//db.admin = require('./app/modles/admin')(sequelize, Sequelize);
//db.articles = require('./app/modles/articles')(sequelize, Sequelize);

module.exports = db;