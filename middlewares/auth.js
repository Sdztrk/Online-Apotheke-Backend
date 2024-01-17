"use strict"


const jwt = require('jsonwebtoken');
const User = require('../models/user')
const ErrorResponse = require('../utils/ErrorResponse');
// const Profile = require('../models/Profile');

exports.protect = async(req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1]

    if(!token) 
        throw new ErrorResponse(401, 'Not authorize to access this route')
    // verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id)


    next()
}

exports.authorize = (...roles)=>(req, res, next)=>{
    if(!roles.includes(req.user.role))
        throw new ErrorResponse(403, `User role ${req.user.role} is not authorized to access this route`)
    next();
}

exports.isAdminOrOwner = (model, filterName)=>async(req, res, next)=>{


        const resource = await model.findOne({_id: req.params.id})


    if(req.user && (req.user.role==='admin' || resource[filterName].toString()===req.user._id.toString()))

        return next()

        else 
        throw new ErrorResponse(403, 'No Permission Admin login or account owner')
}

