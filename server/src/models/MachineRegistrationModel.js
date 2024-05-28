// models/MachineRegistrationModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import the configured Sequelize instance
const Customer = require('./CustomerRegistrationModel'); // Import the Customer model

const MachineRegistration = sequelize.define('MachineRegistration', {
    machine_register_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customer_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    machine_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    machine_location: {
        type: DataTypes.STRING(50),
        allowNull: false
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
    tableName: 'Machines_Table',
    timestamps: false // Set timestamps to false if you want to handle timestamps manually
});

// Setting up the foreign key relationship in sequelize
MachineRegistration.belongsTo(Customer, {
    foreignKey: 'customer_id',
    targetKey: 'customer_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Customer.hasMany(MachineRegistration, {
    foreignKey: 'customer_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = MachineRegistration;
