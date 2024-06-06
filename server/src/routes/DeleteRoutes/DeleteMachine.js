// Import necessary modules
const express = require('express');
const router = express.Router();
const Machine = require('../../models/MachineRegistrationModel'); // Assuming this is the Machine model

// Route to handle machine deletion
router.delete('/:machineRegisterId', async (req, res) => {
    try {
        const machine_register_id = req.params.machineRegisterId;

        // Check if the machine exists
        const machine = await Machine.findByPk(machine_register_id);
        if (!machine) {
            return res.status(404).json({ error: 'Machine not found' });
        }

        // Delete the machine
        await machine.destroy();

        res.status(200).json({ message: 'Machine deleted successfully' });
    } catch (error) {
        console.error('Error deleting machine:', error);
        res.status(500).json({ error: 'Error deleting machine' });
    }
});

// Export the router
module.exports = router;
