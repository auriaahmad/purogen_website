//packages Import
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes Import
const admin_registration = require('./src/routes/RegistrationRoutes/AdminRegistrationRoute');
const customer_registration = require('./src/routes/RegistrationRoutes/CustomerRegistrationRoute');
const machine_registration = require('./src/routes/RegistrationRoutes/MachineRegistrationRoute');
const user_registration = require('./src/routes/RegistrationRoutes/UserRegistration');
// const all_recipe_data = require('./src/routes/adminRoutes/AllRecipesData');
// const all_users_profiles = require('./src/routes/adminRoutes/AllUsersProfiles');
// const user_registration = require('./src/routes/commonRoutes/Registration');
// const particular_user_data = require('./src/routes/adminRoutes/ParticularUserData')
const signin = require('./src/routes/authRoutes/SignIn');
const logout = require('./src/routes/authRoutes/LogOut');
const verifyToken = require('./src/middleware/tokenValidator')

// Database Connection
const { testConnection } = require('./src/config/database');
testConnection();

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(verifyToken);


app.use('/adminReg', admin_registration);
app.use('/customerReg', customer_registration);
app.use('/machineReg', machine_registration);
app.use('/userReg', user_registration);
// app.use('/alluserdata', all_recipe_data);
// app.use('/users', all_users_profiles);
// app.use('/registerUser', user_registration);
// app.use('/particularuserdata', particular_user_data);

// module.exports = router;
app.use('/signin', signin);
app.use('/logout', logout);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});