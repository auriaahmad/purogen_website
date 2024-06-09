const express = require('express');
const router = express.Router();
const Customer = require('../../models/CustomerRegistrationModel'); 

router.put('/:customerId', async (req, res) => {
    try {
        const customer_id = req.params.customerId;
        const { box_name, first_name, last_name, phone_number, email } = req.body;
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        customer.box_name = box_name || customer.box_name;
        customer.first_name = first_name || customer.first_name;
        customer.last_name = last_name || customer.last_name;
        customer.phone_number = phone_number || customer.phone_number;
        customer.email = email || customer.email;
        await customer.save();
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Error updating customer' });
    }
});

module.exports = router;