const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    code:{
        type:String,
        required:true,
        unique:true
        
    },
    customer:{
        type:String,
        required:true
    },
    department:{
        type:String, 
        required:true
    },
    employee:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    message:{
        type:String, 
        required:true
    },
    status:{
        type:Boolean,
        default: false
    }
   
})


const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports={
    Ticket
}