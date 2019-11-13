const {User} = require('../models/users')

const authenticateUser =(req, res, next)=>{
    const token = req.header('x-auth')
       
    User.findByToken(token)
    .then(function (user){
        if(user){
            req.user = user
            req.token = token
            next()
        }
        else{
            res.status('401').send({notice:'login credentials not found'})
        }
       
    })
    .catch((err)=>{
        res.status('401').send(err)
    })
}

module.exports={
    authenticateUser
}