const express = require('express');
const router = express.Router();
const MachineAssignment = require('../../models/UserMachineAssignmentModel');
const Customer = require('../../models/CustomerRegistrationModel');
const User = require('../../models/UserRegistrationModel');
const Machine = require('../../models/MachineRegistrationModel');

router.get('/allUserMachineAssignments', async (req, res) => {
    try {
        const assignments = await MachineAssignment.findAll({
            include: [
                {
                    model: Customer,
                    attributes: ['customer_id', 'box_name', 'first_name', 'last_name', 'phone_number', 'email'] // Specify the fields you want to include
                },
                {
                    model: User,
                    attributes: ['user_id', 'username', 'first_name', 'last_name', 'email'] // Specify the fields you want to include
                },
                {
                    model: Machine,
                    attributes: ['machine_register_id', 'machine_id', 'machine_location'] // Specify the fields you want to include
                }
            ]
        });

        // Clean up the assignments list by removing unwanted fields
        const cleanedAssignments = assignments.map(assignment => {
            const { password, ...cleanedAssignment } = assignment.dataValues;
            return cleanedAssignment;
        });

        res.json(cleanedAssignments);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;
