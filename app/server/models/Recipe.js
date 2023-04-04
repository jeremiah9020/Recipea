const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Recipe extends Model {}

Recipe.init({
    // foreign key to User's database
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true,
    },

    // hours:minutes:seconds
    time: {
        type:DataTypes.STRING,
        allowNull: true,
    },

    // ingredient 1:ingredient 2:...
    ingredients: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    // tag 1:tag 2:tag 3:...
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    // step 1:step 2:step 3:...
    steps: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize
});

module.exports = Recipe;