// admin sessions data
// models/AdminSessions.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import the configured Sequelize instance
const Admin = require('./AdminRegistrationData'); // Import the Admin model

const AdminSessions = sequelize.define('AdminSessions', {
    admin_session_id: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    admin_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Admin,
            key: 'admin_id'
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
    tableName: 'Admin_Sessions',
    timestamps: false // Set timestamps to false since we are handling them manually
});

// Setting up the foreign key relationship in sequelize
AdminSessions.belongsTo(Admin, { foreignKey: 'admin_id', targetKey: 'admin_id', onDelete: 'CASCADE' });

module.exports = AdminSessions;
