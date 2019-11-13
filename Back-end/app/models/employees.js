const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const employeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
   email:{
       type:String,
       required:true,
       unique:true,
      validate:{
          validator: function(value){
            return validator.isEmail(value)
          },
          message: function(){
            return 'Invalid email format'
          }
      }
   },
   mobile:{
       type:Number,
       required:true,
       minlength:10,
       maxlength:10
   },
   department:{
       type:String,
       required:true
   }
})

const Employees = mongoose.model('Employees', employeeSchema)
module.exports={
    Employees
}