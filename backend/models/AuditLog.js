const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditLog = sequelize.define('AuditLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    action: {
        type: DataTypes.STRING, // CREATE, UPDATE, DELETE, LOGIN, STOCK_UPDATE
        allowNull: false
    },
    entity: {
        type: DataTypes.STRING, // Product, User, Category
        allowNull: false
    },
    entityId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    details: {
        type: DataTypes.TEXT, // JSON string or description
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = AuditLog;
