// Import necessary modules
const express = require('express');
const router = express.Router();
const Machine = require('../../models/MachineRegistrationModel'); // Assuming this is the Machine model

// Route to handle machine updating
router.put('/:machineRegisterId', async (req, res) => {
    try {
        const machine_register_id = req.params.machineRegisterId;
        const { machine_id, machine_location } = req.body;

        // Check if the machine exists
        const machine = await Machine.findByPk(machine_register_id);
        if (!machine) {
            return res.status(404).json({ error: 'Machine not found' });
        }

        // Update the machine details
        machine.machine_id = machine_id || machine.machine_id;
        machine.machine_location = machine_location || machine.machine_location;

        // Save the updated machine
        await machine.save();

        res.status(200).json({ message: 'Machine updated successfully' });
    } catch (error) {
        console.error('Error updating machine:', error);
        res.status(500).json({ error: 'Error updating machine' });
    }
});

// Export the router
module.exports = router;
