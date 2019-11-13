const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema


const usersSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        minlength:5,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        
        validate:{
            validator:function(value){
               return validator.isEmail(value)
            },
            message:function(){
                return('Invalid email format')
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128,
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
    
})

//pre-hook
usersSchema.pre('save', function(next){
    const user = this
    if(user.isNew){ // this will check whether the user record is new or not if its new then only the program will run
        bcryptjs.genSalt(10)
    .then(function (salt){
        bcryptjs.hash(user.password, salt)
        .then(function (encryptedPassword){
             user.password = encryptedPassword
             next()
        })
    })
    .catch(function(err){
        console.log(err)
    })
    }
    else {
        next()
    }
    
})
//own static method
usersSchema.statics.findByToken = function (token){
    const User = this
    let tokenData 
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    }
    catch (err){
        return Promise.reject(err)
    }
  return User.findOne({
        _id:tokenData._id,
        'tokens.token': token
    })
   
}


//own static method
usersSchema.statics.findByCredentials = function (email,password){
    const User  = this
        return User.findOne({email})
        .then((user)=>{
            if(!user){
                return Promise.reject('Invalid email/password')
            }
            return bcryptjs.compare(password, user.password)
            .then((result)=>{
                if(result){
                    return Promise.resolve(user)
                }
                else{
                    return Promise.reject('Invalid email/password')
                }
            })
        })
        .catch((err)=>{
            return Promise.reject(err)
        })
}

//own Instance Method
usersSchema.methods.generateToken = function (){
    const User = this
    const tokenData = {
        _id:User._id,
        username:User.userName,
        createdAt :Number(new Date())
    }

    const token = jwt.sign (tokenData, 'jwt@123')
    User.tokens.push({
        token
    })

    return User.save()
    .then(function (User){
        
        return Promise.resolve(token)
        
    })
    .catch(function(err){
        return Promise.reject(err)
    })

}

const User = mongoose.model('User', usersSchema)
module.exports={
        User
}