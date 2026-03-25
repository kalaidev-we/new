const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Category = require('./models/Category');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Admin.deleteMany();
        await Category.deleteMany();

        await Admin.create({
            username: 'admin',
            password: 'password123',
            role: 'superadmin'
        });

        await Category.insertMany([
            { name: 'Electronics', description: 'Gadgets and devices' },
            { name: 'Apparel', description: 'Clothing and accessories' },
            { name: 'Home & Kitchen', description: 'Appliances and furniture' },
            { name: 'Software', description: 'Digital products and tools' }
        ]);

        console.log('Seed Data Imported Successfully - Admin: username: admin / password: password123');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
