// src/middleware/dataValidator.js

const { validationResult, check } = require('express-validator');

const validateUserData = async (req, res, next) => {
    // Perform data validation using express-validator
    await Promise.all([
        check('username').notEmpty().withMessage('Username is required'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('phone_number').isMobilePhone().withMessage('Invalid phone number format'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ].map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Data is validated, proceed to the next middleware
    next();
};

module.exports = validateUserData;
