const { getEndpointAggregation,getServiceSummary  } = require('../services/aggregation.service');
const {attachHealthStatus,calculateHealth}=require("../services/health.service")

exports.getEndpoints = async (req, res) => {
  try {

    const { userId, serviceName } = req.agent

    const endTime = new Date()
    const startTime = new Date(Date.now() - 5 * 60 * 1000) 

    const data = await getEndpointAggregation(
      userId,
      serviceName,
      startTime,
      endTime
    )
    const enriched = attachHealthStatus(data)
    res.json({
      success: true,
      endpoints: enriched
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: "Aggregation failed"
    })
  }
}

exports.getSummary = async (req, res) => {
  try {

    const { userId, serviceName } = req.agent;

    const endTime = new Date();
    const startTime = new Date(Date.now() - 5 * 60 * 1000); // last 5 min

    const summary = await getServiceSummary(
      userId,
      serviceName,
      startTime,
      endTime
    );

    const status = calculateHealth(summary);

    return res.json({
      success: true,
      summary: {
        ...summary,
        status
      }
    });

  } catch (err) {
    console.error("Summary aggregation error:", err);
    return res.status(500).json({
      success: false,
      message: "Summary aggregation failed"
    });
  }
};

