const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../../models/UserRegistrationModel');
const UserSession = require('../../models/UserSessionsModel');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/user', async (req, res) => {
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
        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: `${exp}s` });
        delete user.password;
        user.token = token;
        const user_session_id = uuidv4();
        const expires_at = new Date(Date.now() + exp * 1000);


        await UserSession.create({
            user_session_id,
            user_id: user.user_id,
            expires_at
        });

        res.cookie('purogen_cookie', token, { httpOnly: true, expires: expires_at, secure: true });

        // Include user session ID in the user object
        
        // Return success response with modified user object
        user.customer_id = undefined;
        user.password = undefined;
        user.created_at = undefined;
        user.updated_at = undefined;
        user.phone_number = undefined;
        user.email = undefined;
        console.log(typeof(user));
        user['user_session_id'] = user_session_id;
        console.log(user);


        // console.log(user);
        res.status(200).json({ message: 'Sign-in successful', user:{...user.dataValues,user_session_id}, token});

    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Error signing in' });
    }
});

module.exports = router;
