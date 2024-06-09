const express = require('express');
const router = express.Router();
const Customer = require('../../models/CustomerRegistrationModel'); 

router.delete('/:customerId', async (req, res) => {
    try {
        const customer_id = req.params.customerId;
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.destroy();
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Error deleting customer' });
    }
});

module.exports = router;