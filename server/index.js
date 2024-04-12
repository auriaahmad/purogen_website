const express = require('express');
const app = express();
const dataRoutes = require('./src/routes/dataRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const registerUserRoutes = require('./src/routes/registerUserRoute');
const authRoutes = require('./src/routes/authRoutes');
const logOutRoutes = require('./src/routes/logOutRoute');

// Middleware
app.use(express.json());

// Database Connection
const { testConnection } = require('./src/config/database');
testConnection();

app.use('/userdata', dataRoutes);
app.use('/users', profileRoutes);
app.use('/registerUser', registerUserRoutes);
app.use('/auth', authRoutes);
app.use('/logout', logOutRoutes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
