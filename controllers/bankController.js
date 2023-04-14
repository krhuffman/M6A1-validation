const bankAccount = require('../models/bankModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{check, validationResult} = require('express-validator');

exports.register = async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    res.status(200).render('newBankAccount', {pageTitle: 'newBankAccount'});
}

exports.create = async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {accountHolder, accountNumber, accountType, routingNumber, state, address, zipCode} = req.body; 
    try {
        const bankAddress = {state, address, zipCode}
        bankAccount.create({
            accountHolder: accountHolder,
            accountNumber: accountNumber,
            accountType: accountType,
            routingNumber: routingNumber,
            address: bankAddress,
        }).then(bankAccount => res.json(bankAccount));
    } catch(error){
        console.log(error);
        const errors = validationResult(req);
        const errorDetails = [
            {
                "location": "Authorization",
                "msg": `${accountHolder} ${error}`,
                "param": accountHolder
            }
        ];
        res.json({errors: errorDetails});
    }
}

// exports.updateByAccountNumber = async (req, res) =>{
//     const errors = validationResult(req); 
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()});
//     }

//     const bankAccount = await bankAccount.findByIdAndUpdate({ accountNumber: req.body.accountNumber});
//     if(!bankAccount){
//         return res.status(400).json({error: 'accountNumber does not exist'});
//     }

// }

// exports.deleteByAccountNumber = async (req, res) =>{
//     const errors = validationResult(req); 
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()});
//     }

//     const bankAccount = await bankAccount.findByIdAndDelete({ accountNumber: req.body.accountNumber});
//     if(!bankAccount){
//         return res.status(400).json({error: 'accountNumber does not exist'});
//     }
// }