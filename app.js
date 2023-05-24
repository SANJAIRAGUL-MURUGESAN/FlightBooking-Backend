const express = require('express') // Importing Express
const app = express() // Calling Express Function
const cookieParser = require('cookie-parser') // Importing Cookie-Parser
const bodyParser = require('body-parser') // Importing Body-Parser
const addflight = require('./routes/addflight') // Importinng add flight route to add Flights by Mr.Admin
const {Flight, Book } = require('./database/schema') // Importing Mongoose Schemas from MongoDB Storage
const getallflights = require('./routes/getallflights') // Importing getallflights route to showcase all flights available by both Mr.Admin and Mr.User
const getflightsbysearch = require('./routes/getflightbysearch') // Importing getflightsbysearch route to get all available flights in according to search with Location, Data and Time
const getfeaturedflights = require('./routes/getfeaturedflights') // Importing get featuredflights route where similar to getflightsbysearch route to showcase in home page
const register = require('./routes/adduser') // Importing register route to get register in the Web Application 
const logger = require('./routes/userlogin') //Importing Logger route to get logged In in the Web Application
const cors = require('cors') // importing cors for cient and server communication
const booker = require('./routes/createbooking') // importing booker route to book an flight both by Mr.Admin and Mr.User
const flightcount = require('./routes/flightcount') // importing flightcount route to count number of flights available for pagination purpose
const session = require("express-session") // importing Express-Session to maintain session but due to incompletion in Client we have not enhaced Express Session
const MongoDBStore = require('connect-mongodb-session')(session);  // importing Express-MongoDB-Session to maintain session but due to incompletion in Client we have not enhaced Express Session
 


// Storing in Session Information in MongoDB Database Storage but due to incompletion in Client we have not enhaced Express Session
// var store = new MongoDBStore(
//     {
//       uri: 'mongodb://127.0.0.1:27017/',
//       databaseName: 'NEW',
//       collection: 'SESSIONS',
//     },
//     function(error) {
//       // Should have gotten an error
//       // console.log(error)
//     });



// Enabling Cors Options to enhace the communication between server and client

const corsOptions = {
    origin : true, // making origin as true
    credentials : true // making credentials as true
}


const SESSION_TIMING = 60*60*60*24 // Time to maintain session in server but due to incompletion in Client we have not enhaced Express Session

const{
    PORT = 5000,  
    SESSION_NAME = 'sid', // Not Used
    SESSION_SECRET = 'Its Sessions Secret', // Not Used
    SESSION_LIFETIME = SESSION_TIMING // Not used 
}=process.env

app.use(express.json())   // making express.json() as an middleware for every routes
app.use(cors(corsOptions)) // making cors() as an middleware for every routes
app.use(bodyParser.urlencoded({extended:true})) // making body-parser as an middleware for every routes
app.use(cookieParser()) // making cookie-parser as an middleware for every routes



//  Making Sessions as Middlware for all routs for Mr.User and Mr.Admin Authentication but due to incompletion in Client we have not enhanced Session
// app.use(session({
//     name : SESSION_NAME,
//     secret : SESSION_SECRET,
//     saveUninitialized : false,
//     resave : false,
//     store : store,
//     cookie : {
//         maxAge : SESSION_LIFETIME,
//         httpOnly : true,
//         sameSite : true,
//         secure : false
//     }
// }))


// route to add an  flight by admin

app.use('/api/v1/addflight',addflight)




// route to get single flight details by flight id as per mongoDB Storage

app.get('/api/v1/flight/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const Flights = await Flight.findById(id)
        // console.log(Flights)
        res.status(200).json({  
            Success : true,
            Data : Flights
        })
    }catch(err){
        res.status(044).json({
            Success : false,
            Data : Flights
        })
    }
})

// route to delete an flight by admin 

app.get('/api/v1/flight/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const Flights = await Flight.deleteMany({_id:id})
        // console.log(Flights)
        res.status(200).json({  
            Success : true,
            Data : Flights
        })
    }catch(err){
        res.status(044).json({
            Success : false,
            Data : Flights
        })
    }
})


// route to check the seat availabilty of a flight as per id stored in mongoDB

app.get('/api/v1/flights/seats/:id',async(req,res)=>{
    try{
        const id = req.params.id
        console.log(id)
        const tour = await Flight.findById(id) // If no seats were available then based on the returning object side UI will be handled in client
        // console.log(tour)
        res.status(200).json({
            Success : true,
            Data : tour
        })
    }catch(err){
        res.status(200).json({
            Success : false,
            Data : 'There is an Error'
        })
    }
})




// route to check the overall flight booking Data history by every Mr.User and Mr.Admin

app.get('/api/v1/myflights/:username', async(req,res)=>{
    try{
        const value = req.params.username
        console.log(value)
        const tour = await Book.find({Username:value})
        console.log(tour)
        res.status(200).json({ // If no flights were available then based on the returning object side UI will be handled in client
            Success : true,
            Data : tour
        })
    }catch(err){
        res.status(404).json({
            Success : true,
            Data : tour
        })
    }
    
})





// route to get all available flights by Mr.User and Mr.Admin

app.use('/api/v1/flights',getallflights) // If no flights were available then based on the returning object side UI will be handled in client


// route to get total available number of flight count (mainly used for pagination - developer view)

app.use('/api/v1/tours/search/gettourcount',flightcount)




// route to get flight details by search by both Mr.User and Mr.Admin

app.use('/api/v1/flights/search/getflightsbysearch',getflightsbysearch)





// route to get featured Flights to display in the home page

app.use('/api/v1/tours/search/getfeaturedtours',getfeaturedflights)

//////////////////// User Module ///////////

// route to Mr.User and Mr.Admin registeration in the Web Application

app.use('/api/v1/auth/register',register)


// route to Mr.User and Mr.Admin logging in the Web Application

app.use('/api/v1/auth/login',logger)




// route to book an flight both byu Mr.Admin and Mr.User

app.use('/api/v1/booking',booker)


// Logout will be Handled In Client Side

// Server Listening Function

app.listen(5000,()=>{
    console.log('Server Listening to Port Number 3000...')
})