const express = require('express');
const router = express.Router();
const CutomerMachineData = require('../../models/CustomerMachineDataModel');

router.get('/:machine_id/:customer_id', async (req, res) => {
  try {
    const { machine_id, customer_id } = req.params;

    // Check if machine_id and customer_id are provided
    if (!machine_id || !customer_id) {
      return res.status(400).json({ error: 'Machine ID or Customer ID not provided' });
    }

    // Fetch data from CustomerMachineDataModel for the given machine_id and customer_id
    const customerMachineData = await CutomerMachineData.findAll({
      where: {
        machine_id: machine_id,
        customer_id: customer_id
      }
    });

    res.json(customerMachineData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
