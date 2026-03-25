const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const authAdmin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            username: admin.username,
            role: admin.role,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
};

// @desc    Register a new admin (Used for initial setup)
// @route   POST /api/auth/register
// @access  Public (Should be protected in true production after 1st admin)
const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    const adminExists = await Admin.findOne({ username });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({
        username,
        password,
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            username: admin.username,
            role: admin.role,
            token: generateToken(admin._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
};

module.exports = { authAdmin, registerAdmin };
