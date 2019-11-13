const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const validator  = require('validator')
const {User} = require('./users')
const customerSchema  = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function (){
                return('Invalid email format')
            }
        }
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    }
    

})

const Customer = mongoose.model('Customer', customerSchema)

module.exports= {
    Customer
}