const express = require('express')
const router = express.Router()
module.exports = router
router.use('/api/v1/bonos', require('./bonos.routes'))
router.use('/api/v1/movements', require('./movements.routes'))
router.use('/api/v1/user', require('./user.routes'))