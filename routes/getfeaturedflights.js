const express = require('express')
const { Flight } = require('../database/schema')
const getfeaturedflights = express.Router()


getfeaturedflights.get('/',async(req,res)=>{
    try{
        const tours = await Flight.find().limit(8)
        res.status(200).json({
            Success : true,
            Data : tours
        })
    }catch(err){
        res.status(404).json({
        Success : true,
        Data :'Error'
    })
    }
})

module.exports = getfeaturedflights
