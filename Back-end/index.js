const express = require('express')
const app = express()
const port = 3010
const {usersRouter} = require('./app/controllers/usersController')
const {employeesRouter} = require('./app/controllers/employeeController')
const {customerRouter} = require('./app/controllers/customerController')
const {ticketRouter} = require('./app/controllers/ticketController')
const {departmentRouter} = require('./app/controllers/departmentController')

const ConfigureDb = require('./app/config/database')
ConfigureDb()

app.use(express.json())

app.use('/users', usersRouter)
app.use('/employees', employeesRouter )
app.use('/customers', customerRouter)
app.use('/tickets', ticketRouter)
app.use('/departments', departmentRouter)



app.get('/', function(req, res){
    res.send('Welcome to ticket master backend')
})

app.listen(port, function(){
    console.log('listening to port', port)
})