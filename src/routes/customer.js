const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/customer');

router.get('/customers', CustomerController.findAll)
router.get('/customers/:customerId', CustomerController.findOne)
router.post('/customers', CustomerController.create);
router.put('/customers/:customerId', CustomerController.updateById)
router.delete('/customers/:customerId', CustomerController.remove)
router.delete('/customers', CustomerController.removeAll)

module.exports = router;
