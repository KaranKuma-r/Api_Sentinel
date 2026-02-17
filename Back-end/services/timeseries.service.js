
const MetricEvents = require("../models/MetricsEvent.model");

async function getTimeSeries(userId, serviceName, startTime, endTime, unit,endpoint) {

   const matchStage = {
    userId: userId,
    serviceName,
    createdAt: { $gte: startTime, $lte: endTime }
  }

  if (endpoint) {
    matchStage.endpoint = endpoint;
  }
  
  const data = await MetricEvents.aggregate([
    
      {$match:matchStage},
    
    {
      $group: {
        _id: {
          time: {
            $dateTrunc: {
              date: "$createdAt",
              unit
            }
          }
        },
        requestCount: { $sum: 1 },
        avgLatency: { $avg: "$responseTimeMs" },
        errorCount: {
          $sum: {
            $cond: [{ $eq: ["$error", true] }, 1, 0]
          }
        }
      }
    },
    { $sort: { "_id.time": 1 } },
    
    {
      $project: {
        _id: 0,
        time: "$_id.time",
        requestCount: 1,
        avgLatency: { $round: ["$avgLatency", 2] },
        errorCount: 1
      }
    }
  ]);

  return data;
}

module.exports = { getTimeSeries };
