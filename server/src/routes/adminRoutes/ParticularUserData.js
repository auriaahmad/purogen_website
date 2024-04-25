const express = require('express');
const router = express.Router();
const UserData = require('../../models//UserData');
router.get('/:userId?', async (req, res) => {
  try {
      const userId = req.params.userId;
      // Check if userId is not provided
      if (!userId) {
          return res.status(400).json({ error: 'Record Not Found' });
      }
    //   console.log(userId);
      // Fetch all data from User_Data table for the given user_id
      const userData = await UserData.findAll({
          where: {
              user_id: userId
          }
      });

      res.json(userData);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});
module.exports = router;
