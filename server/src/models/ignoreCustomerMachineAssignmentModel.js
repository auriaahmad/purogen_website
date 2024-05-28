// // models/CustomerMachineAssignmentModel.js
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/database'); // Import the configured Sequelize instance
// const Customer = require('./CustomerRegistrationModel'); // Import the Customer model
// const Machine = require('./MachineRegistrationModel'); // Import the Machine model

// const CustomerMachineAssignment = sequelize.define('CustomerMachineAssignment', {
//     assignment_id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4
//     },
//     customer_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//             model: Customer,
//             key: 'customer_id'
//         },
//         onDelete: 'CASCADE'
//     },
//     machine_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//             model: Machine,
//             key: 'machine_register_id'
//         },
//         onDelete: 'CASCADE',
//         unique: true // Ensure a machine can't be assigned to multiple customers
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     updated_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         onUpdate: DataTypes.NOW
//     }
// }, {
//     tableName: 'Customer_Machine_Assignment_Table',
//     timestamps: false // Set timestamps to false if you want to handle timestamps manually
// });

// // Setting up the associations in sequelize
// Customer.hasMany(CustomerMachineAssignment, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
// CustomerMachineAssignment.belongsTo(Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' });

// Machine.hasOne(CustomerMachineAssignment, { foreignKey: 'machine_id', onDelete: 'CASCADE' });
// CustomerMachineAssignment.belongsTo(Machine, { foreignKey: 'machine_id', onDelete: 'CASCADE' });

// module.exports = CustomerMachineAssignment;