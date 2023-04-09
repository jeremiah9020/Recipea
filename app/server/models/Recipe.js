const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Recipe extends Model {}

Recipe.init({    
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    // time: in form ##:##:## (hours:minutes:seconds)
    time: {
        type:DataTypes.TEXT,
        allowNull: false,
    },

    // ingredients: in form $:$:... (1/2 cup milk:1 cup flour:1 Tbsp butter)
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    // steps: in form $:$:... (Turn oven to 450 degrees farenheit:Pour milk in pan)
    steps: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    // tags: in form #:#:... (1:2:3, corresponding to tagid)
    tags: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize
});

module.exports = Recipe;