const express = require('express')
const { Book, Flight } = require('../database/schema')
const booker = express.Router()

booker.post('/',async(req,res)=>{
    try{
        const {Flightid,Flightname,username,guestSize,phone,bookAt,seat1No,seat2No,seat3No} = req.body
        const add = new Book({
            Flightname : Flightname,
            Username : username,
            GuestSize : guestSize,
            Phone : phone,
            BookAt : bookAt,
            Seat1No : seat1No,
            Seat2No : seat2No,
            Seat3No : seat3No
        })
        await add.save()
        if(seat1No!=0){
                const doc = await Flight.findOne({ _id: Flightid })
                doc.Array.push(Number(seat1No))
                await doc.save()
        }
        if(seat2No!=0){
                const doc = await Flight.findOne({ _id: Flightid })
                doc.Array.push(Number(seat2No))
                await doc.save()
        }
        if(seat3No!=0){
            const doc = await Flight.findOne({ _id: Flightid })
            doc.Array.push(Number(seat3No))
            await doc.save()

        }
        const ans = await Flight.find({_id:Flightid})
        console.log(ans[0].Array)

        res.status(200).json({
            success : true,
            message : 'Booked Successfully'
        })
    }catch(err){
        res.status(200).json({
            success : False,
            message : 'Booking Not Successfull'
        })
    }
    
})


module.exports = booker