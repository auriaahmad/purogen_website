const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const  Machine  = require('../../models/MachineRegistrationModel');

// Route to register a new user
router.post('/',  async (req, res) => {
    try {
        const { customer_id, machine_id, machine_location } = req.body;
        console.log(customer_id);

        // Check if username already exists
        let existingMachineId = await Machine.findOne({ where: { machine_id } });
        if (existingMachineId) {
            return res.status(400).json({ error: 'Machine ID Already Exist' });
        }

        // Generate UUID for user_id
        const machine_register_id = uuidv4();

        // Create new user in the database
        const newMachine = await Machine.create({
            machine_register_id,
            customer_id,
            machine_id,
            machine_location,
        });

        res.status(201).json({ message: 'Machine ID Registered Successfully', machine: {
            machine_register_id: newMachine.machine_register_id,
            customer_id: newMachine.customer_id,    
            user_id: newMachine.machine_id,
        }
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error registering Machine ID' });
    }
});

module.exports = router;