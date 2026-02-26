const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const {createAgent,getAgents}=require("../controllers/agent.controller")

router.post("/create",auth,createAgent)
router.get('/serviceName',auth,getAgents)
module.exports=router