"use strict"

const express = require('express');
const app = express();
require("colors");
require('dotenv').config();
require('express-async-errors');
const cors = require("cors");
const path = require("path");
const swaggerUI = require("swagger-ui-express")
const swaggerJson = require("./swagger.json")
const redoc = require("redoc-express")


// Configurations
const PORT = process.env.PORT || 8080;
const HOST  =process.env.HOST || 'localhost';
const MODE = process.env.MODE || 'production';


// Connect to DB
require('./config/connectDB')()


// Middlewares 
// Parse JSON 
// Parse JSON bodies (up to 50 megabytes)
app.use(express.json({ limit: '50mb' }));
// Parse URL-encoded bodies (up to 50 megabytes)
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// Enable CORS
app.use(cors({
    credentials: true,
 }))

// Express Error Handler 
app.use(require('./middlewares/errorHandler'));

// App Routes
app.use('/api/v1', require('./routes'))

// app.use('/docs/swagger', swaggerUI.serve, swaggerUI.setup(swaggerJson))
app.use("/docs/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJson))



app.get('/', (req, res) => {
    /*
        #swagger.tags= ['Root']
        #swagger.summary= 'Root Path'
        #swagger.description= 'This is the root path of our API.  It will provide links to 
        the documentation (visible with swagger-ui-express and redoc-express) and contact information.'
    */

    res.send({
        error: false,
        message: 'Welcome to Online Apotheke API',
        api: {
            documents: {
                swagger: `https://online-apotheke-v1-api.onrender.com/docs/swagger`,
            },
            contact: 'msaidozturk1@gmail.com'
        },
    })
})



// Run server 
const server = app.listen(PORT, console.log(`Server running in ${MODE} mode on http://${HOST}:${PORT}`.blue.underline))


// Handle rejections
process.on('unhandledRejection', (error, promise)=>{
    console.log(`Error: ${error.message}`.red);
    server.close(()=>{
        console.log(`Server Stopped!`.red.underline)
        process.exit(1);
    })
})