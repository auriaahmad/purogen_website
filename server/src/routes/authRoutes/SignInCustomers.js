const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../../models/CustomerRegistrationModel');
const UserSession = require('../../models/CustomerSessionsModel');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/customer', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        let user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const exp = 5000;
        const token = jwt.sign({ customer_id: user.customer_id }, JWT_SECRET, { expiresIn: `${exp}s` });
        delete user.password;
        user.token = token;
        const customer_session_id = uuidv4();
        const expires_at = new Date(Date.now() + exp * 1000);


        await UserSession.create({
            customer_session_id,
            customer_id: user.customer_id,
            expires_at
        });

        res.cookie('purogen_cookie', token, { httpOnly: true, expires: expires_at, secure: true });

        // Include customer session ID in the user object
        
        // Return success response with modified user object
        user.password = undefined;
        user.created_at = undefined;
        user.updated_at = undefined;
        user.phone_number = undefined;
        user.email = undefined;
        console.log(typeof(user));
        user['customer_session_id'] = customer_session_id;
        console.log(user);


        // console.log(user);
        res.status(200).json({ message: 'Sign-in successful', user:{...user.dataValues,customer_session_id}, token});

    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Error signing in' });
    }
});

module.exports = router;
