const jwt = require('jsonwebtoken')

const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1NzE4MTU2OTQyMDUiLCJ1c2VybmFtZSI6InVzZXJOYW1lIiwiY3JlYXRlZEF0IjoxNTcxODMwNzQ2MTYwLCJpYXQiOjE1NzE4MzA3NDZ9.PP_61W2xOfJOrb8nGZbZDhLpvP5R-wSR1wjKwB9Hl9E'

const result = jwt.verify(token, 'jwt@123')
console.log(result)