const express = require('express');
const router = express.Router();
const UserMachineAssignment = require('../../models/UserMachineAssignmentModel');
router.get('/:user_id?', async (req, res) => {
  try {
      const user_id = req.params.user_id;
      if (!user_id) {
          return res.status(400).json({ error: 'Record Not Found' });
      }

      const userMachineAssignment = await UserMachineAssignment.findAll({
          where: {
              user_id: user_id
          }
      });

      res.json(userMachineAssignment);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});
module.exports = router;