// // models/CustomerUserAssignmentModel.js
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/database'); // Import the configured Sequelize instance
// const Customer = require('./CustomerRegistrationModel'); // Import the Customer model
// const User = require('./UserRegistrationModel'); // Import the User model

// const CustomerUserAssignment = sequelize.define('CustomerUserAssignment', {
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
//     user_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//             model: User,
//             key: 'user_id'
//         },
//         onDelete: 'CASCADE',
//         unique: true // Ensure a user can't be assigned to multiple customers
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
//     tableName: 'Customer_User_Assignment_Table',
//     timestamps: false // Set timestamps to false if you want to handle timestamps manually
// });

// // Setting up the associations in sequelize
// Customer.hasMany(CustomerUserAssignment, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
// CustomerUserAssignment.belongsTo(Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE' });

// User.hasOne(CustomerUserAssignment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// CustomerUserAssignment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// module.exports = CustomerUserAssignment;
