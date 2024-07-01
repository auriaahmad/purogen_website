const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 
const Admin = require('./AdminRegistrationModel'); 
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
    tableName: 'admin_sessions',
    timestamps: false // Set timestamps to false since we are handling them manually
});

AdminSessions.belongsTo(Admin, { foreignKey: 'admin_id', targetKey: 'admin_id', onDelete: 'CASCADE' });

module.exports = AdminSessions;
