const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Customer = require('./CustomerRegistrationModel');
const MachineRegistration = require('./MachineRegistrationModel');
const User = require('./UserRegistrationModel');

const UserMachineAssignment = sequelize.define('UserMachineAssignment', {
    user_machine_assignment_id: {
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
    machine_register_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: MachineRegistration,
            key: 'machine_register_id'
        },
        onDelete: 'CASCADE'
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
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'User_Machine_Assignment_Table',
    timestamps: false 
});

// Setting up the associations in sequelize
Customer.hasMany(UserMachineAssignment, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
UserMachineAssignment.belongsTo(Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' });

MachineRegistration.hasMany(UserMachineAssignment, { foreignKey: 'machine_register_id', onDelete: 'CASCADE' });
UserMachineAssignment.belongsTo(MachineRegistration, { foreignKey: 'machine_register_id', onDelete: 'CASCADE' });

User.hasMany(UserMachineAssignment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserMachineAssignment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = UserMachineAssignment;