const express = require('express')
const router = express.Router()
const {Customer} = require('../models/customers')
const {User} = require('../models/users')



router.post('/register', function(req,res){
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(function (user){
    const body = req.body
    console.log(body)
    const customer= new Customer(body)
    customer.save()
    .then(function(customer){
        res.send(customer)
    })
    .catch(function(err){
        res.send(err)
    })
    })
    .catch(function(err){
        res.send(err)
    })
    
})

router.get('/list', function(req,res){
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(function(user){
        Customer.find({},function (data, err){
            if(data){
                res.send(data)
            }
            else{
                res.send(err)
            }
        })
    
    })
    .catch(function (err){
        res.send(err)
    })
   
})

router.delete('/delete/:id',function (req,res){
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(function (user){
      const id = req.params.id
    Customer.findByIdAndDelete(id)
        .then(customer=>{
                res.send(customer)
        })
        .catch(err=>{
            res.send(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports  = {
    customerRouter : router
}