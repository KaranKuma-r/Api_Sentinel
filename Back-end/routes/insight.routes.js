const router = require("express").Router();
const { getInsights } = require("../controllers/insight.controller");
const agentAuth = require("../middleware/agentAuth.middleware");
const aiLimiter = require("../middleware/aiLimiter");

router.get("/",agentAuth, aiLimiter,getInsights);

module.exports = router;