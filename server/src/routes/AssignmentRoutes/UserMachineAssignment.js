const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const  MachineAssingment  = require('../../models/UserMachineAssignmentModel');
const  Customer  = require('../../models/CustomerRegistrationModel');
const  Machine  = require('../../models/MachineRegistrationModel');
const  User  = require('../../models/UserRegistrationModel'); 


// Route to register a new user
router.post('/',  async (req, res) => {
    try {
        const { customer_id, machine_register_id, user_id} = req.body;
        // console.log(customer_id);

        // Check if customer already exists
        let existingCustomer = await Customer.findOne({ where: { customer_id } });
        if (!existingCustomer) {
            return res.status(404).json({ error: 'Customer Does Not Exist' });
        }
        // Check if machine already exists
        let existingMachine = await Machine.findOne({ where: { machine_register_id } });
        if (!existingMachine) {
            return res.status(404).json({ error: 'Machine Does Not Exist' });
        }
        // Check if user already exists
        let existingUser = await User.findOne({ where: { user_id } });
        if (!existingUser) {
            return res.status(404).json({ error: 'User Does Not Exist' });
        }

        // Generate UUID for user_id
        const user_machine_assignment_id = uuidv4();

        // Create new user in the database
        await MachineAssingment.create({
            user_machine_assignment_id,
            customer_id,
            machine_register_id,
            user_id
        });

        res.status(201).json({ message: 'Machine Assigned Successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error Machine Assignment' });
    }
});

module.exports = router;