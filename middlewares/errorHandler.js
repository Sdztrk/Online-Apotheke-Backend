"use strict"


const ErrorResponse = require('../utils/ErrorResponse');

module.exports = (err, req, res, next)=>{

    let error = {...err}
    error.message = err.message;

    console.log(error.message)
    console.log(err.stack.red)

    // Mongoose validation errors
    if(error.name==='ValidationError'){
        const message = Object.values(error.errors).map(item=> item.message).join(', ')
        error = new ErrorResponse(404, message)
    } 


    // Mongoose duplicate Key
    if(error.code===11000){

        error = new ErrorResponse(404, 'Duplicate field value entered')
    }
    

    res.status(error.statusCode || 500).json({
        success: false, 
        error: error.message || 'Server Error'
    })
}