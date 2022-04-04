const mongoose=require('mongoose')
const {check}=require('express-validator')

const registerSchema=mongoose.Schema({

    name:String,
    companyName:String,
    email:String,
    password:String,
    contact:Number,
    pickUpLocation:{
        pickUpLatitude:String,
        pickUpLongitude:String
    },
    dropLocation:{
        dropLatitude:String,
        dropLongitude:String
    },
    travelDistance:String,
    price:Number,
    profileImage:String,
    typeOfVehicle:String,
    typeOfRole:String,
    address:String,
    location:String,
    selectVehicle:String,
    userId:String,
    ownerId:String,
    deleteFlag:{
        type:String,
        default:false
    }
    
})

const otpSchema=mongoose.Schema({
    otp:Number,
    userDetails:{
        type:Object
    },
    deleteFlag:{
        type:String,
        default:false
    }
})

const validation = [
    check('email').trim().isEmail().withMessage('email  must be valid'),
    check('password').isLength({ min: 5}).withMessage('password must be minimum 5 character')
    
]

const register=mongoose.model('register',registerSchema)

const sendOtp=mongoose.model('otpSchema',otpSchema)

module.exports={register,sendOtp,validation}