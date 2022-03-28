const router=require('express').Router()

const {registerForDeliveryCandidate,login,verifyUserOtp,ownerGetOurOwnEmployeeList,getAllDriverList,getSingleDriverData,updateDriverProfile,deleteDriverProfile}=require('../driverDetails/driver_controller')
const{filterWithiRadius}=require('./location_controller')
const multer=require('../middleware/multer')
const valid=require('../superControll/superAdmin_model')

router.post('/register',multer.upload.single('profileImage'),valid.validation,registerForDeliveryCandidate)

router.post('/login',valid.validation,login)
router.get('/verifyUserOtp/:otp',verifyUserOtp)

router.get('/filterLocation',filterWithiRadius)

router.get('/ownerGetOurOwnEmployeeList',ownerGetOurOwnEmployeeList)

router.get('/getAllDriverList',getAllDriverList)
router.get('/getSingleDriverData',getSingleDriverData)

router.put('/updateDriverProfile',updateDriverProfile)
router.delete('/deleteDriverProfile',deleteDriverProfile)


module.exports=router