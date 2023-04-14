const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const addressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        length: [2, 'A state must have 2 characters']
    },
    address: {
        type: String,
        required: true,
        minlength: [15, 'An address must have less or equal then 50 characters.'],
        maxlength: [50, 'An address must have less or equal then 50 characters.']
    },
    zipCode: {
        type: Number,
        required: true,
        length: [5, 'A zip-code must have 5 numbers']
    },
})

const bankSchema =  new mongoose.Schema({
    accountHolder: {
        type: String,
        required: true,
        maxlength: [50, 'An address must have less or equal then 50 characters.']
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        length: [9, 'A account number must have 9 numbers']
    },
    accountType: {
        type: String,
        enum: {
            values: ['Checking', 'Savings', 'Foriegn'],
            message: '{VALUE} is not supported'
          },
        required: true,
    },
    routingNumber: {
        type: Number,
        required: true,
        length: [9, 'A routing number must have 9 numbers']
    },
    address: addressSchema,
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token: {
        type: String,
        required: true
        }
    }]
        
})



bankSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, config.get('jwtSecret'));
        this.toikens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error){
        console.log(error);
    }
}


module.exports = mongoose.model('bankAccount', bankSchema);