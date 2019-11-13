const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const validator = require('validator')
const departmentSchema = new Schema({
    department:{
        type:String,
        required:true,
        unique:true
    }
})

const Departments = mongoose.model('Departments', departmentSchema)
module.exports={Departments}