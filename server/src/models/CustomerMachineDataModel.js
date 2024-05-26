// customers machine data
// models/CustomersMachineData.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import the configured Sequelize instance
const Customer = require('./CustomerRegistrationData'); // Import the Customer model
const MachineRegistration = require('./MachineRegistrationData'); // Import the MachineRegistration model

const CustomersMachineData = sequelize.define('CustomersMachineData', {
    customers_machine_data_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    machine_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: MachineRegistration,
            key: 'machine_id'
        },
        onDelete: 'CASCADE'
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
    tableName: 'Customers_Machine_Data_Table',
    timestamps: true // Set timestamps to false if you want to handle timestamps manually
});

// Setting up the foreign key relationships in sequelize
CustomersMachineData.belongsTo(Customer, { foreignKey: 'customer_id', targetKey: 'customer_id', onDelete: 'CASCADE' });
CustomersMachineData.belongsTo(MachineRegistration, { foreignKey: 'machine_id', targetKey: 'machine_id', onDelete: 'CASCADE' });

module.exports = CustomersMachineData;
