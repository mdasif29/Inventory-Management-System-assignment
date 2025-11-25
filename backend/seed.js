const sequelize = require('./config/database');
const { User, Category, Product } = require('./models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // WARNING: This drops all tables!
        console.log('Database synced');

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('asif', salt);

        await User.create({
            name: 'Admin Us',
            email: 'asif@gmail.com',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('Admin user created: admin@example.com / admin123');

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
