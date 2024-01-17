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
app.use(express.json())   //req.body 
// Enable CORS
app.use(cors({
    credentials: true,
 }))

 // set static folder 
app.use(express.static(path.join(__dirname, 'public')))
// Express Error Handler 
app.use(require('./middlewares/errorHandler'));

// App Routes
app.use('/api/v1', require('./routes'))

// app.use('/docs/swagger', swaggerUI.serve, swaggerUI.setup(swaggerJson))
app.use("/docs/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJson))


//route for redoc:
app.use("/docs/redoc", redoc({
    spaceUrl:"docs/json",
    title:"API Docs"
}))


//route for swagger.json
app.use("/docs/json", (req,res)=> {
    res.sendFile("swagger.json", {root:"."})
})



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