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
        trim:true,
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
            message: 'Invalid value. Please choose either Tablet or Liquid.'
        }
    },
    packageSize: {
        type: String,
        trim:true,
    },
    illness: {
        type: String,
        required:true,
        enum: ['Rachen', 'Schlafen', 'Stress', 'Herz', 'Magen', 'Schnupfen', 'Pflege', 'Schmerz', 'Husten'],
        validate: {
            validator: function(value) {
                // Check if the value is one of the allowed enum values
                return ['Rachen', 'Schlafen', 'Stress', 'Herz', 'Magen', 'Schnupfen', 'Pflege', 'Schmerz', 'Husten'].includes(value);
            },
            message: 'Invalid value. Please choose one of them Rachen, Schlafen, Stress, Herz, Magen, Schnupfen, Pflege, Schmerz, Husten.'
        }
    },
    manufacturerCountry: {
        type: String,
        trim:true,
    },
    type: {
        type: String,
        trim:true,
    },
    discount: {
        type: Boolean,
        default:false,
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
        required:true,
        trim:true,
    },
    expirationDate: {
        type: String,
        trim:true,
    },
    applicationMethod: {
        type: String,
        trim:true,
    },
    description: {
        type: String,
        trim:true,
        required:true,
    },
});

module.exports = model('Products', ProductSchema)