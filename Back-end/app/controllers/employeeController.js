const express= require('express')
const router = express.Router()
const {Employees} = require('../models/employees')
const{User} = require('../models/users')


router.post('/register', function(req, res){
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(function(user){
        const body = req.body
        console.log(body)
        const emp = new Employees(body)
        emp.save()
        .then(function(emp){
            res.send(emp)
        })
        .catch(function (err){
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
        Employees.find({}, function(data,err){
            if(data){
                res.send(data)
            }
            else
            {
                res.send(err)
            }
        })
    })
    .catch(function(err){
        res.send(err)
    })
   
})
router.delete('/delete/:id', function (req,res){
    const id = req.params.id
    const token = req.header('x-auth')
    User.findByToken(token)
    .then(response=>{
       Employees.findByIdAndDelete(id)
       .then(employee=>{
           res.send(employee)
       })
    })
    .catch(err=>{
        res.send(err)
    })
})


module.exports={
    employeesRouter : router
}