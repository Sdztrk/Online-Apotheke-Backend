"use strict"



const {Schema, model} = require('mongoose')

const profileSchema = new Schema({

    image: {
        type:String, 
        default:'no-photo.jpg'
    }, 
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }, 
    address:{
        type:String, 
        required: true, 
    }

}, {timestamps: true})

module.exports = model('Profile', profileSchema)