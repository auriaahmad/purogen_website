const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 
const Customer = require('./CustomerRegistrationModel'); 

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
    tableName: 'machines_table',
    timestamps: false  
});

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
