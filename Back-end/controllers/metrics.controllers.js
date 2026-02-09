const MetricsEvent = require("../models/MetricsEvent.model")

const ingestMetrics =async  (req, res) => {

    try {

        const { endpoint, method, statusCode, responseTimeMs, error } = req.body

        if (!endpoint || !method || statusCode == null || responseTimeMs == null) {
            return res.status(400).json({
                message: "Missing required metric fields"
            });
        }

        await MetricsEvent.create({
            userId:req.agent.userId,
            serviceName:req.agent.serviceName,
            endpoint,
            method,
            statusCode,
            responseTimeMs,
            error : Boolean(error)
        })
        console.log(endpoint, method, statusCode, responseTimeMs, error )
         res.status(202).json({ message: "Metric ingested" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports=ingestMetrics