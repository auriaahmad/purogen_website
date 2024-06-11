const express = require('express');
const router = express.Router();
const CutomerUser = require('../../../models/UserRegistrationModel');
router.get('/:customer_id?', async (req, res) => {
  try {
      const customer_id = req.params.customer_id;
      // Check if userId is not provided
      if (!customer_id) {
          return res.status(400).json({ error: 'Record Not Found' });
      }
      const customerUser = await CutomerUser.findAll({
          where: {
              customer_id: customer_id
          }
      });

      res.json(customerUser);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});
module.exports = router;
