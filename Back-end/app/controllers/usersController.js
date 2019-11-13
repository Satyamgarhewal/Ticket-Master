const express = require('express')
const router = express.Router()
const {User} = require('../models/users')
const {authenticateUser} = require('../middlewares/authentication')

//localhost:3010/users/register
router.post('/register', function(req,res){
   
   const {body} = req
   console.log(body)
   const user = new User(body)
   user.save()
    .then(function(user){
      res.send('You are successfuly registered')
    })
    .catch(function(err){
       res.send(err)
    })
})

//localhost:3010/users/login
router.post('/login', function (req,res){
    const{body} = req
    User.findByCredentials(body.email, body.password)
    .then((user)=>{
        return user.generateToken()
    })
    .then(function(token){
        console.log(token)
        res.send(token)
        // res.setHeader('x-auth', token).send(token)
    })
    .catch((err)=>{
        res.status('401').send(err)
    })
    })

    //localhost:3010/user/account
    router.get('/account',authenticateUser, function (req,res){
        const {user} = req// If  we need to send the user data to the front end then we will use res.send(user) else we will we do other functionalities which is required.
       res.send(user)
        
    })
   

//localhost:3010/users/logout
    router.delete('/logout',authenticateUser, function(req, res){
        const {user, token} = req
        console.log(user)
        console.log(token)
        res.send('Response from back-end')
        // User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
        // .then(function(){
        //     res.send('Successfully logged out')
        // })
        // .catch(err=>{
        //     res.send(err)
        // })
    })
module.exports= {
    usersRouter: router
}