"use strict"



const router = require('express').Router()
const ctrl = require('../controllers/profile');
const { protect, isAdminOrOwner } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const Profile = require("../models/profile")

router.use(protect)   //req.user => role, name, email, pasword

router.route('/')
.post( upload.single('image')

/*
                #swagger.tags = ["Profile"]
                #swagger.summary = "Create Profile"
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Profile data.',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            image: { type: 'string', example: 'image.png' },
                            userId: { type: 'Schema.ObjectId', ref:"Users" ,example: '655f82e622dc87daf8a7e250' },
                            address: { type: 'string', example: 'SUV' },
                        }
                    }
                },
                #swagger.consumes = ['application/json'],
                #swagger.produces = ['application/json'],
            */

, ctrl.create)

router.route('/:id')
.get(
    
    /*
            #swagger.tags = ["Profile"]
            #swagger.summary = "Returns single Profile"
            */
    
    ctrl.read)

.put(isAdminOrOwner(Profile, 
    
    /*
            #swagger.tags = ["Profile"]
            #swagger.summary = "Update Profile"
        */
    
    'userId'), upload.single('image'), ctrl.update)
    
.delete(isAdminOrOwner(Profile, 'userId'),
/*
            #swagger.tags = ["Profile"]
            #swagger.summary = "Delete Profile"
        */
       
            ctrl.delete)

module.exports = router;