// routes/customerMachineData.js
const express = require('express');
const router = express.Router();
const UserMachineAssignment = require('../../models/UserMachineAssignmentModel');
const CustomerMachineData = require('../../models/CustomerMachineDataModel');
const Machines = require('../../models/MachineRegistrationModel');

router.get('/:user_id/:machine_register_id', async (req, res) => {
  try {
    const { user_id, machine_register_id } = req.params;
    console.log(user_id);
    console.log(machine_register_id);

    // Check if user_id and machine_register_id are provided
    if (!user_id || !machine_register_id) {
      return res.status(400).json({ error: 'User ID or Machine Register ID not provided' });
    }

    // Fetch the assignment record to check if the machine is assigned to the user
    const assignment = await UserMachineAssignment.findOne({
      where: {
        user_id: user_id,
        machine_register_id: machine_register_id,
      },
    });

    // If no assignment is found, return an error
    if (!assignment) {
      return res.status(404).json({ error: 'Machine not assigned to the user' });
    }
    
    // Fetch customer ID from the assignment
    const customer_id = assignment.customer_id;
    const machine = await Machines.findOne({
        where: {
            machine_register_id: machine_register_id,
        },
    });
    if (!machine) {
        return res.status(404).json({ error: 'Machine does not found.' });
    }
    
    const machine_id =  machine.machine_id;

    // Fetch the machine data from Customers_Machine_Data_Table
    const customerMachineData = await CustomerMachineData.findAll({
      where: {
        machine_id: machine_id,
        customer_id: customer_id,
      },
    });

    res.json(customerMachineData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;