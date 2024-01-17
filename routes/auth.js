"use strict"



const router = require('express').Router()
const authCtrl = require('../controllers/auth');
const { protect } = require('../middlewares/auth');

router.post('/register',

/*
                #swagger.tags = ["Authentication"]
                #swagger.summary = "Register"
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

authCtrl.register);
router.post('/login',
/*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with email and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    email: 'test@email.com',
                    password: '123456'
                }
            }
        */
 authCtrl.login);


router.post('/logout',

/*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
        */

authCtrl.logout);


router.put('/details', 

/*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Details'
        */

protect,  authCtrl.updateDetails)
router.put('/password',

/*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Password'
        */

protect, authCtrl.updatePassword)


module.exports = router