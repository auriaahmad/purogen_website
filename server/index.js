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

// Edit Routes
const edit_customer = require('./src/routes/EditRoutes/EditCustomer');
const edit_machine = require('./src/routes/EditRoutes/EditMachine');
const edit_user = require('./src/routes/EditRoutes/EditUser');

// Visulization Data Routes
const all_customers_machine_data = require('./src/routes/VisulizationDataRoutes/AllCustomersMachinesData');
const all_registered_customers= require('./src/routes/VisulizationDataRoutes/AllRegisteredCustomers');
const all_registered_machines= require('./src/routes/VisulizationDataRoutes/AllRegisteredMachines');
const all_registered_users= require('./src/routes/VisulizationDataRoutes/AllRegisteredUsers');
const particular_customer_machine_data = require('./src/routes/VisulizationDataRoutes/ParticularCustomerMachineData')
const particular_customer_machines = require('./src/routes/VisulizationDataRoutes/ParticularCustomerMachines')
const particular_user_machine_assigns = require('./src/routes/VisulizationDataRoutes/ParticularUserMachineAssignments')

// Visulization Data Routes Cutomers
const particular_customer_all_users = require('./src/routes/VisulizationDataRoutes/cutomer/ParticularCustomerAllUsers')

// Auth Routes Admin
const signin = require('./src/routes/AuthRoutes/SignIn');
const logout = require('./src/routes/AuthRoutes/LogOut');

// Auth Routes Customer
const signinCustomer = require('./src/routes/AuthRoutes/SignInCustomers');
const logoutCustomer = require('./src/routes/AuthRoutes/LogOutCustomers');

// Auth Routes User
const signinUser = require('./src/routes/AuthRoutes/SignInUsers');
const logoutUser = require('./src/routes/AuthRoutes/LogOutUsers');
 


const verifyToken = require('./src/middleware/tokenValidator')

// Database Connection
const { testConnection } = require('./src/config/database');
testConnection();

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
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

// Edit Routes
app.use('/editCustomer', edit_customer);
app.use('/editMachine', edit_machine);
app.use('/editUser', edit_user);


// Visulization Data Routes
app.use('/allCustomerMachineData', all_customers_machine_data);
app.use('/allRegisteredCustomers', all_registered_customers);
app.use('/allRegisteredMachines', all_registered_machines);
app.use('/allRegisteredUsers', all_registered_users);
app.use('/particularCustomerMachineData', particular_customer_machine_data);
app.use('/particularCustomerMachine', particular_customer_machines);
app.use('/userMachineAssignments', particular_user_machine_assigns);

// Visulization Data Routes Customers
app.use('/particularCustomerAllUsers', particular_customer_all_users )
 

// Auth Routes Admin
app.use('/signin', signin);
app.use('/logout', logout);

// Auth Routes Customer
app.use('/signin', signinCustomer);
app.use('/logout', logoutCustomer);

// Auth Routes User
app.use('/signin', signinUser);
app.use('/logout', logoutUser);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});