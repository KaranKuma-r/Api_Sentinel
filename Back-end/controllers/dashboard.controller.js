const { getEndpointAggregation, getServiceSummary, getSlowEndpoints } = require('../services/aggregation.service');
const {getErrorAnalytics}=require("../services/errorAnalytics.service")
const { attachHealthStatus, calculateHealth } = require("../services/health.service")
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
    const endpoint = req.query.endpoint || null; 

    const { startTime, unit } = getTimeRange(range);
    const endTime = new Date();

    const data = await getTimeSeries(
      userId,
      serviceName,
      startTime,
      endTime,
      unit,
      endpoint
    );

    res.json({
      success: true,
      range,
      endpoint, 
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


exports.slowEndpoints = async (req, res) => {

  try {
    const { userId, serviceName } = req.agent

    const { range = "1h", limit = 5 } = req.query;

    const endTime = new Date()
    const { startTime } = getTimeRange(range);


    const data = await getSlowEndpoints(
      userId,
      serviceName,
      startTime,
      endTime,
      Number(limit)
    );

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

};


exports.getErrors = async (req, res) => {
  try {

    const { userId, serviceName } = req.agent;

    const range = req.query.range || "1h";

    const { startTime } = getTimeRange(range);
    const endTime = new Date();

    const data = await getErrorAnalytics(
      userId,
      serviceName,
      startTime,
      endTime
    );

    res.json({
      success: true,
      range,
      data
    });

    
  } catch (err) {
    console.error("Error analytics failed:", err);
    res.status(500).json({
      success: false,
      message: "Error analytics failed"
    });
  }
};
