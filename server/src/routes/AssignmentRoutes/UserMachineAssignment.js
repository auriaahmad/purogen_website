const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const MachineAssignment = require('../../models/UserMachineAssignmentModel');
const Customer = require('../../models/CustomerRegistrationModel');
const Machine = require('../../models/MachineRegistrationModel');
const User = require('../../models/UserRegistrationModel');


router.post('/', async (req, res) => {
  try {
    const assignments = req.body; // Expecting an array of assignments

    for (const assignment of assignments) {
      const { customer_id, machine_register_id, user_id, action } = assignment;

      let existingCustomer = await Customer.findOne({ where: { customer_id } });
      if (!existingCustomer) {
        return res.status(404).json({ error: `Customer with ID ${customer_id} does not exist` });
      }

      let existingMachine = await Machine.findOne({ where: { machine_register_id } });
      if (!existingMachine) {
        return res.status(404).json({ error: `Machine with ID ${machine_register_id} does not exist` });
      }

      let existingUser = await User.findOne({ where: { user_id } });
      if (!existingUser) {
        return res.status(404).json({ error: `User with ID ${user_id} does not exist` });
      }

      if (action === 'assign') {
        let existingAssignment = await MachineAssignment.findOne({ where: { machine_register_id, user_id } });
        if (existingAssignment) {
          continue;
        }

        const user_machine_assignment_id = uuidv4();
        await MachineAssignment.create({
          user_machine_assignment_id,
          customer_id,
          machine_register_id,
          user_id
        });
      } else if (action === 'unassign') {
        await MachineAssignment.destroy({ where: { machine_register_id, user_id } });
      }
    }

    res.status(201).json({ message: 'Machines assigned/unassigned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during machine assignment/unassignment' });
  }
});

module.exports = router;