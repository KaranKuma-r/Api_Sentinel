const Agent = require("../models/Agent.model")

const agentAuth = async (req, res,next) => {

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Agent key missing"
            });
        }

        const agentKey = authHeader.split(" ")[1];
        const agent = await Agent.findOne({ agentKey })

        if (!agent) {
            return res.status(401).json({
                message: "Invalid agent key"
            })
        };

        req.agent = {
            userId: agent.userId,
            serviceName: agent.serviceName,
            agentKey: agent.agentKey
        };

        next()
    } catch (error) {
        console.error("Agent auth error:", error);
        res.status(500).json({ message: "Agent authentication failed" });
    }
}
module.exports=agentAuth