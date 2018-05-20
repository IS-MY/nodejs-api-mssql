// models/user/index.js

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function (models) {
                //  Listing.belongsTo(models.User);
            }
        }
    });
    return User;
};