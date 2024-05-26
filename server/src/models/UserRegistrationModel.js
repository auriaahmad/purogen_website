// user registration data
// models/UserRegistrationData.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import the configured Sequelize instance
const Customer = require('./CustomerRegistrationData'); // Import the Customer model

const UserRegistration = sequelize.define('UserRegistration', {
    user_id: {
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
        }
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
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
    tableName: 'Users_Table',
    timestamps: true // Set timestamps to false if you want to handle timestamps manually
});

// Setting up the foreign key relationships in sequelize
UserRegistration.belongsTo(Customer, { foreignKey: 'customer_id', targetKey: 'customer_id' });

module.exports = UserRegistration;
