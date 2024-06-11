const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 
const Customer = require('./CustomerRegistrationModel'); 
const CustomerSessions = sequelize.define('CustomerSessions', {
    customer_session_id: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customer_id'
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
    tableName: 'Customer_Sessions',
    timestamps: false // Set timestamps to false since we are handling them manually
});

CustomerSessions.belongsTo(Customer, { foreignKey: 'customer_id', targetKey: 'customer_id', onDelete: 'CASCADE' });

module.exports = CustomerSessions;
