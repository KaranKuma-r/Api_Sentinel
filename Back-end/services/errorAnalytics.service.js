const mongoose = require("mongoose");
const MetricEvents = require("../models/MetricsEvent.model");

async function getErrorAnalytics(agentKey, startTime, endTime) {

  const result = await MetricEvents.aggregate([

    {
      $match: {
        agentKey,
        error: true,
        createdAt: {
          $gte: startTime,
          $lte: endTime
        }
      }
    },

    {
      $facet: {

        statusCodes: [
          {
            $group: {
              _id: "$statusCode",
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } },
          {
            $project: {
              _id: 0,
              statusCode: "$_id",
              count: 1
            }
          }
        ],

        endpoints: [
          {
            $group: {
              _id: "$endpoint",
              errorCount: { $sum: 1 }
            }
          },
          { $sort: { errorCount: -1 } },
          {
            $project: {
              _id: 0,
              endpoint: "$_id",
              errorCount: 1
            }
          }
        ]

      }
    }

  ]);

  return result[0] || { statusCodes: [], endpoints: [] };
}

module.exports = { getErrorAnalytics };
