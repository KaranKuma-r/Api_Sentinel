const express = require('express')
const router = express.Router()

const { getEndpoints,getSummary,getTimeSeriesData, slowEndpoints } = require('../controllers/dashboard.controller')
const agentAuth = require('../middleware/agentAuth.middleware')

router.get('/endpoints', agentAuth, getEndpoints)
router.get('/summary', agentAuth, getSummary);   
router.get("/timeseries",agentAuth,getTimeSeriesData)
router.get("/slow", agentAuth, slowEndpoints);

module.exports = router
