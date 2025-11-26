const sequelize = require('./config/database');
const { User, Category, Product } = require('./models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // WARNING: This drops all tables!
        console.log('Database synced');

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const managerPassword = await bcrypt.hash('manager123', salt);

        await User.create({
            name: 'Admin User',
            email: 'admin@inventory.com',
            password: adminPassword,
            role: 'admin'
        });

        await User.create({
            name: 'Manager User',
            email: 'manager@inventory.com',
            password: managerPassword,
            role: 'manager'
        });

        console.log('Users created:');
        console.log('Admin: admin@inventory.com / admin123');
        console.log('Manager: manager@inventory.com / manager123');

        // Create Categories
        const categories = await Category.bulkCreate([
            { name: 'Electronics', description: 'Gadgets and devices' },
            { name: 'Clothing', description: 'Apparel and fashion' },
            { name: 'Home & Garden', description: 'Furniture and tools' }
        ]);
        console.log('Categories created');

        // Create Dummy Product
        await Product.create({
            name: 'Laptop Pro',
            sku: 'LAP-001',
            price: 999.99,
            stock: 50,
            categoryId: categories[0].id,
            description: 'High performance laptop'
        });
        console.log('Dummy product created');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
