const express = require('express')
const router = express.Router()

const employeesController = require('../controllers/employeesController')

router.post('/register', employeesController.register)

module.exports = router