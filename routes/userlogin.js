const express = require('express')
const { User } = require('../database/schema')
const bcrypt = require('bcrypt')
const logger = express.Router()

logger.post('/',async(req,res)=>{
    try{
        const {email,password,type} = req.body
        // console.log(email,password)
        const passwordagain  = password
        const user = await User.findOne({email}) // checking Registered Email is Existing in MongoDB DataBase Storae
        if(!user){                               // If Username is not existing then responding client as Invalid Email
            res.status(404).json({
                success : false,
                message :  'Invalid email'
            })
        }else{
            const {password, role, ...rest} = user._doc // If username is available then validating the password
            console.log(user.password)
            // await bcrypt
            // .compare(user.password,passwordagain)
            // .then(result => {
            //     // console.log(result) // return true
            //     if(result===false){
            //         return res.status(404).json({
            //             Message : " Invalid Password "
            //         })
            //     }else{
            //         return res.status(200).json({
            //             success : true,
            //             message :  'Login Successful',
            //             data : {...rest}
            //         })
            //     }
            // })
            if(user.password===passwordagain){
                return res.status(200).json({
                    success : true,
                    message :  'Login Successful',
                    data : {...rest}
                })
            }else{
                return res.status(404).json({
                    success : false,
                    message : " Invalid Password "
                })
            }
        }
        
    }catch(err){
        console.log(err)
        res.status(404).json({
            success : false,
            message :  'Login Unsuccessful',
        })
    }
    
})

module.exports = logger