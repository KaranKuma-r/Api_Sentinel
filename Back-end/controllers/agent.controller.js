const Agent = require("../models/Agent.model")
const generatekey = require('../utils/generateskey')

const createAgent = async (req, res) => {
    try {

        const { serviceName } = req.body

        const existingAgent = await Agent.findOne({
            userId: req.user.id,
            serviceName
        });

        if (existingAgent) {
            return res.status(200).json({
                agentKey: existingAgent.agentKey,
                message: "Agent already exists for this service name"
            });
        }

        const agent = await Agent.create({
            userId: req.user.id,
            serviceName,
            agentKey: generatekey()
        })

        res.status(201).json({ agentKey: agent.agentKey })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = createAgent