const express = require('express');
const router = express.Router();
const CutomerMachineData = require('../../models/CustomerMachineDataModel');
router.get('/:machine_id?', async (req, res) => {
  try {
      const machine_id = req.params.machine_id;
      // Check if userId is not provided
      if (!machine_id) {
          return res.status(400).json({ error: 'Record Not Found' });
      }
    //   console.log(userId);
      // Fetch all data from User_Data table for the given customer_id
      const customerMachineData = await CutomerMachineData.findAll({
          where: {
              machine_id: machine_id
          }
      });

      res.json(customerMachineData);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});
module.exports = router;
