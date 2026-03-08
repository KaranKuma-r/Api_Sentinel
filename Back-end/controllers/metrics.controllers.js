const MetricsEvent = require("../models/MetricsEvent.model")

const ingestMetrics = async (req, res) => {

    try {
        const agentKeyFromHeaders = req.headers.authorization;

        if (!agentKeyFromHeaders) return res.status(400).json({ message: "Missing Authorization header" })

        const agentKey = agentKeyFromHeaders.split(" ")[1];

        if (!agentKey) {
            return res.status(400).json({
                message: "Invalid agent key format"
            });
        }

        const { endpoint, method, statusCode, responseTimeMs } = req.body

        if (!endpoint || !method || statusCode == null || responseTimeMs == null) {
            return res.status(400).json({
                message: "Missing required metric fields"
            });
        }
        const isError = statusCode >= 400;

        await MetricsEvent.create({
            agentKey,
            endpoint,
            method,
            statusCode,
            responseTimeMs,
            error: isError
        })
       
        res.status(202).json({ message: "Metric ingested" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = ingestMetrics