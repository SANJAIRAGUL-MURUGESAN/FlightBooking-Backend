const express = require('express')
const addflight = express.Router()
const {Flight} = require('../database/schema.js')

addflight.post('/',async(req,res)=>{
    const { flightname,boardingpoint,bpAM,bpPM,endingpoint,epAM,epPM,flightnumber,addAt,price} = req.body
    const add = new Flight({
        Flightname : flightname,
        Boardingpoint : boardingpoint,
        bpAM : Number(bpAM),
        bpPM : Number(bpPM),
        Endingpoint : endingpoint,
        epAM :  Number(epAM),
        epPM : Number(epPM),
        FlightNumber : flightnumber,
        AddAt : addAt,
        Price : price
    })
    await add.save()
    res.status(200).json({
        success : true,
        message : "Flight Added Successfully"
    })
})

module.exports = addflight