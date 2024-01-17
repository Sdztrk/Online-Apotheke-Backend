"use strict"



const router = require('express').Router();
const ctrl = require('../controllers/product');
const { protect, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const query = require('../middlewares/query');
const PharmaceuticalProduct = require('../models/products');

router.route('/')
  .get( query(PharmaceuticalProduct)
  
  /*
            #swagger.tags = ["Product"]
            #swagger.summary = "Returns a list of all Reservations"
            #swagger.description = "Sends all Reservations."
            */
  
  , ctrl.list)
  .post(protect,
    
    /*
                #swagger.tags = ["Product"]
                #swagger.summary = "Create Reservation"
                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Products data.',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'name' },
                            brand: { type: 'string', example: 'Brand' },
                            manufacturer: { type: 'string', example: 'Any GMBH' },
                            pzn: { type: 'Number', example: '2020' },
                            image: { type: 'string', example: 'image.png' },
                            distributionForm: { type: 'enum', example: 'Tablet-Liquid' },
                            packageSize: { type: 'string', example: 'packageSize' },
                            manufacturerCountry: { type: 'string', example: 'manufacturerCountry' },
                            activeIngredient: { type: 'string', example: 'activeIngredient' },
                            dosage: { type: 'string', example: 'dosage' },
                            sideEffects: { type: 'string', example: 'sideEffects' },
                            pregnancyNotification: { type: 'string', example: 'pregnancyNotification' },
                            price: { type: 'Number', example: '19' },
                            expirationDate: { type: 'string', example: 'expirationDate' },
                            applicationMethod: { type: 'string', example: 'applicationMethod' },
                          }
                    }
                },
                #swagger.consumes = ['application/json'],
                #swagger.produces = ['application/json'],
            */
    
    authorize('admin'),upload.single('image'),ctrl.create);

router.route('/:id')
  .get(
    
    /*
            #swagger.tags = ["Product"]
            #swagger.summary = "Returns single Reservation"
            */
    
    ctrl.read)
  .put(
    
    /*
            #swagger.tags = ["Product"]
            #swagger.summary = "Update Reservation"
        */
    
    ctrl.update)
  .delete(
    
    /*
            #swagger.tags = ["Product"]
            #swagger.summary = "Delete Reservation"
        */
    
    ctrl.delete);

module.exports = router;
