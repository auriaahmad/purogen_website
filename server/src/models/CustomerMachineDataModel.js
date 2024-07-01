const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Customer = require('../models/CustomerRegistrationModel'); 

const CustomersMachineData = sequelize.define('CustomersMachineData', {
    customers_machine_data_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    customer_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Customer,
            key: 'customer_id'
        },
        onDelete: 'SET NULL'
    },
    machine_id: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    machine_location: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    processes: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    recipe: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mass: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    strain: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    terpene_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    manufacturer_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    injection_volume: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    injections: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    operator: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    customer_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    chamber: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    temporary1: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    temporary2: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    temporary3: {
        type: DataTypes.STRING(50),
        allowNull: true
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
    tableName: 'customers_machine_data_table',
    timestamps: false 
});

CustomersMachineData.belongsTo(Customer, { foreignKey: 'customer_id', targetKey: 'customer_id', onDelete: 'SET NULL' });

module.exports = CustomersMachineData;