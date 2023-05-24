const express = require('express')
const { Flight } = require('../database/schema')
const getallflights = express.Router()

getallflights.get('/',async(req,res)=>{

    const page = parseInt(req.query.page)
    
    try{
        const flights = await Flight.find({}).skip(page*8).limit(8)
        res.status(200).json({  // If no flights were available then based on the returning object side UI will be handled in client
            Success : true,
            count : flights.length,
            Data : flights,
        })
    }catch(err){
        res.status(200).json({
            Success : false,
            count : flights.length,
            Data : 'Something Went Wrong',
        })
    }

})

module.exports = getallflights