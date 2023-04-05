const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class UserProfile extends Model {}

UserProfile.init({
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    profilepicture: {
        type: DataTypes.BLOB,
        allowNull: true,
    },

    profilebanner: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize
})

module.exports = UserProfile;