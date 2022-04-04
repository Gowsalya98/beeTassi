const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const errorThrower = require('./errorHandler/error_thrower')
const appError = require('./errorHandler/common_error_handler')
require('./config/db_config')
const app = express()

const register=require('./register/register_route')
const user=require('./userDetails/user_route')
const owner=require('./ownerDetails/owner_route')
const driverDetails  = require('./driverDetails/driver_route')
const vehicleDetails =require('./vehicleDetails/vehicle_route')
const payment=require('./paymentDetails/payment_route')
const report=require('./reportDetails/report_route')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static('/home/fbnode/NODE_GOWSI/uploads/BeeTassi/'))

app.use('/BeeTassi',register)
app.use('/BeeTassi/user',user)
app.use('/BeeTassi/owner',owner)
app.use('/BeeTassi/driverDetails',driverDetails)
app.use('/BeeTassi/vehicleDetails',vehicleDetails)
app.use('/BeeTassi/payment',payment)
app.use('/BeeTassi/report',report)


app.get('/',(req,res)=>{
    res.send('welcome BeeTassi')
})

// let nodeGeocoder = require('node-geocoder');
 
// let options = {
//   provider: 'openstreetmap'
// };
 
// let geoCoder = nodeGeocoder(options);
// geoCoder.geocode('Srinivasa Hospital,kalavasal,madurai')
//   .then((res)=> {
//     console.log(res);
//   })
//   .catch((err)=> {
//     console.log(err);
//   });
app.listen(process.env.PORT, () => {
    console.log("port running on ", process.env.PORT)
})

