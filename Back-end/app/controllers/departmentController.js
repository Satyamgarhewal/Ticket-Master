const express = require('express')
const router = express.Router()
const {Departments} = require('../models/departments')
const {User} = require('../models/users')

router.post('/register', function(req,res){
    const token = req.header('x-auth')
    console.log(token)
    User.findByToken(token)
    .then(user=>{
        console.log(user)       
         const body = req.body
        const dept  = new Departments(body)
        dept.save()
        .then(department=>{
            res.send(department)
        })
        .catch(err=>{
            res.status('400').send(err)
        })
    })
    .catch(err=>{
        res.send(err)
    })
    const body = req.body
})

router.get('/list', function (req,res){
    const token = req.header('x-auth')
    User.findByToken(token)
    
    .then(user=>{
       Departments.find({},function (data, err){
           if(data){
               res.send(data)
           }
           else {
               res.send(err)
           }
       })
    })
    .catch(err=>{
        res.send(err)
    })
})

router.delete('/delete/:id', (req,res)=>{
    const token = req.header('x-auth')
    const id = req.params.id
    User.findByToken(token)
    .then(user=>{
        Departments.findByIdAndDelete(id)
        .then(department=>{
            res.send(department)
        })
    })
})
module.exports={
    departmentRouter: router
}