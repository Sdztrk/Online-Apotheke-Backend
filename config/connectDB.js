"use strict"

const {connect} = require("mongoose");

module.exports = async()=>{
    console.log()
    const mongo = await connect(process.env.URI)
    console.log(`Database connected: ${mongo.connection.host}`.yellow.underline)
    
}