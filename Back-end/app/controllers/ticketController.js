const express = require('express')
const router = express.Router()
const{Ticket} = require('../models/tickets')
const {User} =require('../models/users')


router.post('/register', function(req,res){
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(function (user){
        const body = req.body
    console.log(body)
    // res.send('ticket controller')
    const ticket = new Ticket(body)
    ticket.save()
    .then(function(ticket){
        res.send(ticket)
    })
    .catch(function(err){
        res.send(err)
    })

    })
    .catch(function (err){
        res.send(err)
    })
    
    
})
router.get('/list', function (req,res){
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(function (user){
        Ticket.find({},function (data, err){
            if(data){
                res.send(data)
            }
            else{
                res.send(err)
            }
         })  
    })
    .catch(function(err){
        res.send(err)
    })
    
})

module.exports = {
    ticketRouter :router
}