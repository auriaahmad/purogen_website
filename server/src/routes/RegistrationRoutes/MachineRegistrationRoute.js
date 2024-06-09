const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const  Machine  = require('../../models/MachineRegistrationModel');

router.post('/',  async (req, res) => {
    try {
        const { customer_id, machine_id, machine_location } = req.body;
        let existingMachineId = await Machine.findOne({ where: { machine_id } });
        if (existingMachineId) {
            return res.status(400).json({ error: 'Machine ID Already Exist' });
        }
        const machine_register_id = uuidv4();
        const newMachine = await Machine.create({
            machine_register_id,
            customer_id,
            machine_id,
            machine_location,
        });

        res.status(201).json({ message: 'Machine ID Registered Successfully', machine: {   
            machine_id: newMachine.machine_id,
            machine_location: newMachine.machine_location
        }
    });
    } catch (error) {
        res.status(500).json({ error: 'Error registering Machine ID' });
    }
});

module.exports = router;