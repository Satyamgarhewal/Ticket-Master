const mongoose = require('mongoose')

const ConfigureDb =()=>{
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost:27017/ticket-master', {
        useNewUrlParser:true})
        .then(()=>{
            console.log('Successfully connected to Db')
        })
        .catch((err)=>{
            console.log('Error connecting to Db')
        })
}

module.exports = ConfigureDb