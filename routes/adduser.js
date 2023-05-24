const express = require('express')
const { User } = require('../database/schema')
const saltRounds = 10
const register = express.Router()
const bcrypt = require('bcrypt')

register.post('/',async(req,res)=>{
    const {type,username,password,email} = req.body
    // console.log(type)
    // await bcrypt
    //             .hash(password, saltRounds)
    //             .then((hash) => {
    //                 // console.log('Hash ', hash)
    //                 const add = new User({
    //                     username : username,
    //                     usertype  : type,
    //                     password : hash,
    //                     email : email
    //                 })
    //                 add.save()
    //             })
    // res.send('Registered Successfully')
    const add = new User({
        username : username,
        usertype  : type,
        password : password,
        email : email
    })
    await add.save()
    res.status(200).json({
        Success : true,
        Message : 'Registered Successfully'
    })
})

module.exports = register