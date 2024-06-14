const express = require('express');
const router = express.Router();
const UserMachineAssignment = require('../../models/UserMachineAssignmentModel');
const MachineRegistration = require('../../models/MachineRegistrationModel');

router.get('/:user_id?', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      return res.status(400).json({ error: 'Record Not Found' });
    }

    const userMachines = await UserMachineAssignment.findAll({
      where: { user_id: user_id },
      include: [{
        model: MachineRegistration,
        required: true, // Ensures only assignments with a matching machine are included
        attributes: ['machine_register_id', 'customer_id', 'machine_id', 'machine_location', 'created_at', 'updated_at']
      }]
    });

    if (userMachines.length === 0) {
      return res.status(404).json({ error: 'No machines found for this user' });
    }

    const machines = userMachines.map(assignment => assignment.MachineRegistration);

    res.json(machines);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
