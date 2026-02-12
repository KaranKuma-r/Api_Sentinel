const express = require('express')
const router = express.Router()

const { getEndpoints } = require('../controllers/dashboard.controller')
const agentAuth = require('../middleware/agentAuth.middleware')

router.get('/endpoints', agentAuth, getEndpoints)

module.exports = router
