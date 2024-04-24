//packages Import
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes Import
const all_recipe_data = require('./src/routes/adminRoutes/AllRecipesData');
const all_users_profiles = require('./src/routes/adminRoutes/AllUsersProfiles');
const user_registration = require('./src/routes/commonRoutes/Registration');
const signin = require('./src/routes/commonRoutes/SignIn');
const logout = require('./src/routes/commonRoutes/LogOut');
const verifyToken = require('./src/middleware/tokenValidator')

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(verifyToken);

// Database Connection
const { testConnection } = require('./src/config/database');
testConnection();

app.use('/userdata', all_recipe_data);
app.use('/users', all_users_profiles);
app.use('/registerUser', user_registration);
app.use('/signin', signin);
app.use('/logout', logout);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});