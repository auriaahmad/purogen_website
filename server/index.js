//packages Import
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Registration Routes
const admin_registration = require('./src/routes/RegistrationRoutes/AdminRegistrationRoute');
const customer_registration = require('./src/routes/RegistrationRoutes/CustomerRegistrationRoute');
const machine_registration = require('./src/routes/RegistrationRoutes/MachineRegistrationRoute');
const user_registration = require('./src/routes/RegistrationRoutes/UserRegistration');

// Assignment Routes
const user_machine_assignment = require('./src/routes/AssignmentRoutes/UserMachineAssignment');

// Delete Routes
const delete_customer = require('./src/routes/DeleteRoutes/DeleteCustomer');
const delete_machine = require('./src/routes/DeleteRoutes/DeleteMachine');
const delete_user = require('./src/routes/DeleteRoutes/DeleteUser');

// Visulization Data Routes
const all_customers_machine_data = require('./src/routes/VisulizationDataRoutes/AllCustomersMachinesData');
const all_registered_customers= require('./src/routes/VisulizationDataRoutes/AllRegisteredCustomers');
const all_registered_machines= require('./src/routes/VisulizationDataRoutes/AllRegisteredMachines');
const all_registered_users= require('./src/routes/VisulizationDataRoutes/AllRegisteredUsers');
const particular_customer_machine_data = require('./src/routes/VisulizationDataRoutes/ParticularCustomerMachineData')
const particular_customer_machines = require('./src/routes/VisulizationDataRoutes/ParticularCustomerMachines')
// const all_registered_machines= require('./src/routes/VisulizationDataRoutes/AllRegisteredCustomers');
// const all_registered_users= require('./src/routes/VisulizationDataRoutes/AllRegisteredCustomers');
// const user_registration = require('./src/routes/commonRoutes/Registration');

// Auth Routes
const signin = require('./src/routes/AuthRoutes/SignIn');
const logout = require('./src/routes/AuthRoutes/LogOut');


const verifyToken = require('./src/middleware/tokenValidator')

// Database Connection
const { testConnection } = require('./src/config/database');
testConnection();

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
// app.use(cookieParser());
// app.use(verifyToken);

// Registraion Routes
app.use('/adminReg', admin_registration);
app.use('/customerReg', customer_registration);
app.use('/machineReg', machine_registration);
app.use('/userReg', user_registration);

// Assignment Routes
app.use('/userMachineAssign', user_machine_assignment);

// Delete Routes
app.use('/deleteCustomer', delete_customer);
app.use('/deleteMachine', delete_machine);
app.use('/deleteUser', delete_user);


// Visulization Data Routes
app.use('/allCustomerMachineData', all_customers_machine_data);
app.use('/allRegisteredCustomers', all_registered_customers);
app.use('/allRegisteredMachines', all_registered_machines);
app.use('/allRegisteredUsers', all_registered_users);
app.use('/particularCustomerMachineData', particular_customer_machine_data);
app.use('/particularCustomerMachine', particular_customer_machines);

// Auth Routes
app.use('/signin', signin);
app.use('/logout', logout);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});