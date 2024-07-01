const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 
const User = require('./UserRegistrationModel'); 
const UserSessions = sequelize.define('UserSessions', {
    user_session_id: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'user_sessions',
    timestamps: false // Set timestamps to false since we are handling them manually
});

UserSessions.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id', onDelete: 'CASCADE' });

module.exports = UserSessions;
