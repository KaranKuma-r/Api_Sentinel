const router = require("express").Router()
const agentAuth = require("../middleware/agentAuth.middleware")
const ingestMetric = require("../controllers/metrics.controllers")

router.post('/ingest',agentAuth,ingestMetric)

module.exports= router