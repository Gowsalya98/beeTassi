const {userBooking}=require('../userDetails/user_model')
const {register}=require('../register/register_model')
const {driverDetails}=require('../driverDetails/driver_model')
const{cabDetails}=require('../vehicleDetails/vehicle_model')

const jwt=require('jsonwebtoken')


const search = async(req, res) => {
    console.log(req.params.key)
    try {
            const data=await register.find({
                "$or":
                    [{ "companyName": { $regex: req.params.key } },
                    { "location": { $regex: req.params.key } }
                    ]
            })
            console.log('line 18',data);
            res.status(200).send({ message: "search done", data })
                 // {
                //     $search: {
                //       text: {
                //         query: 'search text',
                //         path: ['companyName','location']
                //       }
                //     }
                //   }
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

const createOwnerProfileDetails=(req,res)=>{
    try{
        const ownerToken = jwt.decode(req.headers.authorization)
        const id = ownerToken.userId
        register.findOne({_id:id,deleteFlag:"false"},(err,data)=>{
            if(data.typeOfRole=='owner'){
                req.body.firstName=data.name
                register.findOneAndUpdate({_id:id},req.body,{new:true},(err,result)=>{
                    if(result){
                    console.log('line 137',result)
                    res.status(200).send({message:'profile update successfully',result})
                    }else{
                        res.status(400).send({message:'something wrong your data not updated'}) 
                    }
                })
            }
            else{
                res.status(400).send({message:'invalid token'}) 
            }
        })
    }catch(err){
        res.status(500).send({message:'internal server error'})
    }
}

const ownerGetOurOwnEmployeeList=(req,res)=>{
    try{
        const ownerToken=jwt.decode(req.headers.authorization)
        const id=ownerToken.userId
        driverDetails.find({driverId:id,deleteFlag:'false'},(err,data)=>{
            if(data){
                data.sort().reverse()
                console.log('line 38',data)
                res.status(200).send({message:'Your Own employee List',data})
            }else{
                res.status(400).send({message:'invalid token'})
            }  
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const ownerGetOurOwnVehicleList=(req,res)=>{
    try{
        const ownerToken=jwt.decode(req.headers.authorization)
        const id=ownerToken.userId
        cabDetails.find({cabOwnerId:id,deleteFlag:"false"},(err,data)=>{
            if(data){
                data.sort().reverse()
                console.log('line 52',data)
                res.status(200).send({message:'Your Own Vehicle List',data})
            }else{
                res.status(400).send({message:'invalid token'})
            }  
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const ownergetOurOwnCabBookingHistory=async(req,res)=>{
    try{
        try{
            const ownerToken=jwt.decode(req.headers.authorization)
            const id=ownerToken.userId
            if(id!=null){
                const data=await userBooking.aggregate([{$match:{$and:[{"cabDetails.cabOwnerId":(id)},{deleteFlag:'false'}]}}])
                if(data.length!=0){
                   res.status(200).send({success:'true',message:' booking history',data:data})
                }else{
                   res.status(302).send({success:'false',message:'data not found',data:[]})
                }
            }else{
               res.status(400).send({success:'false',message:'invalid token'})
            }
        }catch(err){
            res.status(500).send({message:'internal server error'})
        }
    }catch(err){
        res.status(500).send({message:'internal server error'})
    }
}
const getAllOwnerList=(req,res)=>{
    try{
        register.find({typeOfRole:'owner',deleteFlag:'false'}, (err, data) => {
            if(data){
                data.sort().reverse()
                console.log("line 64",data)
                res.status(200).send({ data: data })
            } else {
                res.status(400).send({ message: 'your data is already deleted' })
            }

        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const getSingleOwnerDetails=(req,res)=>{
    try{
        if(req.headers.authorization){
            register.findById({_id:req.params.id,deleteFlag:'false'},(err,data)=>{
               if(data){
                    res.status(200).send({ data: data })
                } else {
                    res.status(400).send({ message: 'your data is already deleted' })
                }
    
            })
        }else{
            res.status(400).send({ message: 'unauthorized' }) 
        }
       
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const updateOwnerProfile=(req,res)=>{
    try{
        const ownerToken = jwt.decode(req.headers.authorization)
        const id = ownerToken.userId
        register.findOne({_id:id,deleteFlag:"false"},(err,data)=>{
            if(data){
                register.findOneAndUpdate({_id:id},req.body,{new:true},(err,result)=>{
                    if(result){
                    console.log('line 137',result)
                    res.status(200).send({message:'profile update successfully',result})
                    }else{
                        res.status(400).send({message:'something wrong your data not updated'}) 
                    }
                })
            }
            else{
                res.status(400).send({message:'invalid token'}) 
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const deleteOwnerProfile=(req,res)=>{
    try{
        const ownerToken = jwt.decode(req.headers.authorization)
         const id = ownerToken.userId
        register.findOne({_id:id,deleteFlag:"false"},(err,data)=>{
            if(data){
                console.log('line 119',data)
                register.findOneAndUpdate({_id:id},{deleteFlag:'true'},{returnOriginal:false},(err,result)=>{
                    if(err)throw err
                    console.log('line 122',result)
                    res.status(200).send({message:'deleted successfully',result})
                })
            }
            else{
                res.status(400).send({message:'invalid token'}) 
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}


module.exports={
    search,ownerGetOurOwnEmployeeList,
    ownerGetOurOwnVehicleList,
    createOwnerProfileDetails,
    ownergetOurOwnCabBookingHistory,
    getAllOwnerList,
    getSingleOwnerDetails,
    updateOwnerProfile,
    deleteOwnerProfile
}