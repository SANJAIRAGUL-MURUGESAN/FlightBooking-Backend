const express = require('express')
const { Flight } = require('../database/schema')
const flightcount = express.Router()

flightcount.get('/',async(req,res)=>{
    try{
        const tourc = await Flight.find({})
        const length = tourc.length
        res.status(200).json({
            Success : true,
            Data : length
        })
    }catch(err){
        res.status(400).json({
            Success : false,
            Data : "error"
        })
    }
})

module.exports = flightcount