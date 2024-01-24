"use strict"


const router = require('express').Router()
const ctrl = require('../controllers/users');
const { protect, authorize } = require('../middlewares/auth');
const query = require('../middlewares/query');
const User = require('../models/user');


router.route('/')
.get(protect,
    
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Returns a list of all users"
            #swagger.description = "Sends all users."
            */

    authorize('admin'),query(User), ctrl.list)
.post(
    
    /*
                #swagger.tags = ["Users"]
                #swagger.summary = "Create User"
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'User data.',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'nickname' },
                            password: { type: 'string', example: 'password' },
                            email: { type: 'string', example: 'test@gmail.com' },
                            role: { type: 'string', example: 'firstname' },
                        }
                    }
                },
                #swagger.consumes = ['application/json'],
                #swagger.produces = ['application/json'],
            */

    ctrl.create)

router.route('/:id')
.get(protect,
    
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Returns single user"
            */
    
    ctrl.read)
.put(protect,
    
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
        */
    
    ctrl.update)
.delete(
    
     /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
    
    ctrl.delete)

module.exports = router