const jwt = require('jsonwebtoken')

const payload={
    id:1,
    name:'user1'
}
const token = jwt.sign(payload, 'jwt@123')
console.log(token)