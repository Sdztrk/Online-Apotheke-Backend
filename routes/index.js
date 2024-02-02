"use strict"



const router = require('express').Router()

// route    /api/auth
router.use('/auth', require('./auth'))
// route    /api/users
router.use('/users', require('./user'))

// route    /api/profile
router.use('/profile', require('./profile'));

// route    /api/product
router.use('/product', require('./product'));

router.use("/", require("./stripe"))

module.exports = router