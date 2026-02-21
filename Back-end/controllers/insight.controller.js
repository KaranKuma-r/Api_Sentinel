const { buildInsights } = require("../services/insight/insight.service");
const {getTimeRange} = require("../utils/timeRange.util");

const  {getEndpointAggregation} = require("../services/aggregation.service");

const { getTimeSeries} = require("../services/timeseries.service");

exports.getInsights = async (req, res) => {

  try {
    const { userId, serviceName } = req.agent;
    const range = req.query.range || "1h";

    const { startTime,unit } = getTimeRange(range);
    const endTime = new Date();

    const aggData = await getEndpointAggregation(
      userId,
      serviceName,
      startTime,
      endTime,
      
    );

    const tsData = await getTimeSeries(
      userId,
      serviceName,
      startTime,
      endTime,
      unit
    );

    const insights = await buildInsights(aggData, tsData);
    console.log(aggData,tsData);


    res.json({
      success: true,
      insights
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Insight generation failed"
    });
  }

};