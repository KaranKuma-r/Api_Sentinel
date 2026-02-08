const Agent = require("../models/Agent.model")
const generatekey = require('../utils/generateskey')

const createAgent =async(req,res)=>{
    try {

        const {serviceName} =req.body
        const agent = await Agent.create({
            userId:req.user.id,
            serviceName,
            agentKey:generatekey()
        })
        
        res.status(201).json({agentKey:agent.agentKey})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports=createAgent