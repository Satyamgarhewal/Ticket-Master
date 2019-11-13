const bcryptjs = require('bcryptjs')

const encrypted = '$2a$10$Vw.PYMZvNTyHFZKUW.V99.r7IxpHExdr4ZZeCE3YotIqNjza1BiEy'
const password ='secret123'

bcryptjs.compare(password,encrypted)
    .then(function(result){
     console.log(result)
    })