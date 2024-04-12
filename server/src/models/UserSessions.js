// src/models/UserSession.js

const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');

const UserSession = sequelize.define('User_Sessions', {
    session_id: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    expires_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'User_Sessions',
    timestamps: false // Disable automatic timestamping
});

// Define foreign key constraint
UserSession.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = UserSession;
