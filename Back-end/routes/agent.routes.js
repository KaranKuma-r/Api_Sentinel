const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const createAgent=require("../controllers/agent.controller")

router.post("/create",auth,createAgent)

module.exports=router