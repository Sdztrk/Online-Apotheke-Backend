"use strict"



const { Schema,model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        trim:true,
        required: true,
    },
    brand: {
        type: String,
        trim:true,
        required: true,
    },
    manufacturer: {
        type: String,
        trim:true,
        required: true,
    },
    pzn: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        trim:true,
        required:true
    },
    distributionForm: {
        type: String,
        required: true,
        enum: ['Tablet', 'Liquid'],
        validate: {
            validator: function(value) {
                // Check if the value is one of the allowed enum values
                return ['Tablet', 'Liquid'].includes(value);
            },
            message: 'Invalid size value. Please choose either Tablet or Liquid.'
        }
    },
    packageSize: {
        type: String,
        trim:true,
    },
    manufacturerCountry: {
        type: String,
        trim:true,
    },
    activeIngredient: {
        type: String,
        trim:true,
    },
    dosage: {
        type: String,
        trim:true,
    },
    sideEffects: {
        type: String,
        trim:true,
    },
    pregnancyNotification: {
        type: String,
        trim:true,
    },
    price: {
        type: Number,
    },
    expirationDate: {
        type: String,
        trim:true,
    },
    applicationMethod: {
        type: String,
        trim:true,
    },
});

module.exports = model('Products', ProductSchema)