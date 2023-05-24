const mongoose = require('mongoose')
const {db} = require('../database/mongoose.js')

const flightSchema = new mongoose.Schema({
    Flightname : {
        type : String
    },
    Boardingpoint : {
        type : String
    },
    bpAM : {
        type : Number
    },
    bpPM : {
        type : Number
    },
    Endingpoint : {
        type : String
    },
    epAM : {
        type : Number
    },
    epPM : {
        type : Number
    },
    Flightnumber : {
        type : Number
    },
    AddAt : {
        type : Date
    },
    Price : {
        type : String
    },
    Array : {
        type : Array
    }
})


const tourSchema = new mongoose.Schema({
    title : {
        type : String
    },
    city : {
        type : String
    },
    address : {
        type : String
    },
    distance : {
        type : Number
    },
    photo : {
        type : String
    },
    desc : {
        type : String
    },
    price : {
        type : String
    },
    maxGroupSize : {
        type : Number
    },
    reviews : {
        type : String
    },
    featured : {
        type : Boolean
    }
})


const userSchema = new mongoose.Schema({
    usertype : {
        type : String
    },
    username : {
        type : String
    },
    password : {
       type : String
    },
    email : {
        type : String
    }
})


const bookingSchema = new mongoose.Schema({
    Flightname  : {
        type : String
    },
    Username : {
        type : String
    },
    GuestSize : {
        type : Number
    },
    Phone : {
        type : Number
    },
    BookAt : {
        type : Date
    },
    Seat1No : {
        type : Number
    },
    Seat2No : {
        type : Number
    },
    Seat3No : {
        type : Number
    }
})

module.exports = {
    Tour : db.model('Tour',tourSchema,'TOUR'),
    User : db.model('User',userSchema,'USER'),
    Book :  db.model('Book',bookingSchema,'BOOKING'),
    Flight : db.model('Flight',flightSchema,'FLIGHT')
}