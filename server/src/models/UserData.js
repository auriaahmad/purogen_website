// models/UserData.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database'); // Import the configured Sequelize instance
const User = require('./User'); // Import User model

const UserData = sequelize.define('User_Data', {
    user_data_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_id: DataTypes.STRING,
    recipe: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    mass: DataTypes.STRING,
    process: DataTypes.STRING,
    strain: DataTypes.STRING,
    operator: DataTypes.STRING,
    terpene_name: DataTypes.STRING,
    manufacturer_name: DataTypes.STRING,
    injection_volume: DataTypes.INTEGER,
    injections: DataTypes.STRING,
    customer_name: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    Machine_ID: DataTypes.STRING,
    Machine_Location: DataTypes.STRING,
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
    tableName: 'User_Data', // Set the table name if it's different from the model name
    timestamps: false // Disable Sequelize's default timestamps (created_at, updated_at)
});
UserData.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
module.exports = UserData;
