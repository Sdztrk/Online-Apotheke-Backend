"use strict"



const {Schema, model} = require('mongoose')
const {genSalt, hash, compare} = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email: {
        type: String, 
        trim: true, 
        required:[true, 'Email is required'],
        unique: true, 
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please provide a valid email']
    }, 
    password: {
        type: String, 
        required: [true, 'Password is required'], 
        minlength: 6
    }, 
    role: {
        type: String, 
        enum:['user', 'admin'], 
        default: 'user'
    }
}, {timestamps: true})


// Encrypt Password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();
    const salt = await genSalt(10); 
    this.password  = await hash(this.password, salt)
    next();
})

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword){
    return compare(enteredPassword, this.password);
}

// Generate JWT Token 
userSchema.methods.getToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}


module.exports = model('User', userSchema)