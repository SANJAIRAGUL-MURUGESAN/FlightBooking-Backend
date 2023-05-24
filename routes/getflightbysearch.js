const express = require('express')
const getflightsbysearch = express.Router()
const { Flight } = require('../database/schema')

getflightsbysearch.get('/',async(req,res)=>{
   console.log('Working')
    try{
        const city = new RegExp(req.query.city)
        const date  = req.query.date
        const time = req.query.time

        const tour = await Flight.find( { $and: [ { Endingpoint:city } , { AddAt :  date } ] } )
        console.log(tour)

        res.status(200).json({
            Success : true,
            Data :tour
        })
    }catch(err){
        res.status(200).json({
            Success : false,
            Data : err.message
        })
    }

})

module.exports = getflightsbysearch