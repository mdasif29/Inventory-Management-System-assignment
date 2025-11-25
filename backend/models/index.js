const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const AuditLog = require('./AuditLog');

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(AuditLog, { foreignKey: 'userId' });
AuditLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    User,
    Product,
    Category,
    AuditLog
};
