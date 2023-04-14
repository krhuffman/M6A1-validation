const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

router.route('/newAccount')
    .get(bankController.register)
    .post(bankController.create)

// router.route('/:accountNumber')
//     .patch(bankController.updateByAccountNumber)
//     .delete(bankController.deleteByAccountNumber)

module.exports = router;