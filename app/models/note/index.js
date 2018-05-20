// models/user/index.js

module.exports = function (sequelize, DataTypes) {
    var Note = sequelize.define('Notes', {
        Id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            unique: false
        }
        /*
        ,
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
        */
    /*
    }, {
        classMethods: {
            associate: function (models) {
                //  Listing.belongsTo(models.User);
            }
        }
    */
    }, { 
        underscored: true,
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });
    
    return Note;
};