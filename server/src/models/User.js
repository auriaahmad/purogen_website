// registered user data
// models/UserData.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database'); // Import the configured Sequelize instance

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    box_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Default value for admin status
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'Users',
    timestamps: true // Set timestamps to false if you want to handle timestamps manually
});

module.exports = User;