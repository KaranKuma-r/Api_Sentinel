const router = require("express").Router();
const { getInsights } = require("../controllers/insight.controller");
const agentAuth = require("../middleware/agentAuth.middleware");

router.get("/",agentAuth, getInsights);

module.exports = router;