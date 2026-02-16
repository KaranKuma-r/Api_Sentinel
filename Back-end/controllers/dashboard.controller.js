const { getEndpointAggregation,getServiceSummary  } = require('../services/aggregation.service');
const {attachHealthStatus,calculateHealth}=require("../services/health.service")
const { getTimeSeries } = require("../services/timeseries.service");
const { getTimeRange } = require("../utils/timeRange.util");

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

exports.getTimeSeriesData = async (req, res) => {
  try {
    const { userId, serviceName } = req.agent;

    const range = req.query.range || "1h";

    const { startTime, unit } = getTimeRange(range);
    const endTime = new Date();

    const data = await getTimeSeries(
      userId,
      serviceName,
      startTime,
      endTime,
      unit
    );

    res.json({
      success: true,
      range,
      timeseries: data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Time-series aggregation failed"
    });
  }
};


