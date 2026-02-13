const MetricEvents = require('../models/MetricsEvent.model')

async function getEndpointAggregation(userId, serviceName, startTime, endTime) {

    const result = await MetricEvents.aggregate([
        {

            $match: {
                userId: userId,
                serviceName: serviceName,
                createdAt: {
                    $gte: startTime,
                    $lte: endTime,
                }
            }

        },

        {

            $group: {
                _id: "$endpoint",
                totalRequest: { $sum: 1 },
                avgLatency: { $avg: "$responseTimeMs" },

                errorCount: {
                    $sum: {
                        $cond: [
                            { $eq: ["$error", true] },
                            1,
                            0
                        ]
                    }
                },


                p95: {
                    $percentile: {
                        input: "$responseTimeMs",
                        p: [0.95],
                        method: "approximate"
                    }
                },

                p99: {
                    $percentile: {
                        input: "$responseTimeMs",
                        p: [0.99],
                        method: "approximate"
                    }
                }


            }

        },
        {
            $project: {
                endpoint: "$_id",
                _id: 0,
                totalRequest: 1,
                avgLatency: { $round: ["$avgLatency", 2] },

                p95: { $arrayElemAt: ["$p95", 0] },
                p99: { $arrayElemAt: ["$p99", 0] },

                errorRate: {
                    $round: [
                        {
                            $multiply: [
                                { $divide: ["$errorCount", "$totalRequest"] },
                                100
                            ]
                        },
                        2
                    ]
                }
            }
        },
        { $sort: { totalRequest: -1 } }


    ])
    return result

}

async function getServiceSummary(userId, serviceName, startTime, endTime) {

    const result = await MetricEvents.aggregate([

        {
            $match: {
                userId: userId,
                serviceName: serviceName,
                createdAt: {
                    $gte: startTime,
                    $lte: endTime,
                }
            }
        },

        {
            $group: {
                _id: null,
                totalRequest: { $sum: 1 },
                avgLatency: { $avg: "$responseTimeMs" },

                errorCount: {
                    $sum: {
                        $cond: [
                            { $eq: ["$error", true] },
                            1,
                            0
                        ]
                    }
                },

                p95: {
                    $percentile: {
                        input: "$responseTimeMs",
                        p: [0.95],
                        method: "approximate"
                    }
                }
            }
        },

        {
            $project: {
                _id: 0,
                totalRequest: 1,
                avgLatency: { $round: ["$avgLatency", 2] },
                p95: { $arrayElemAt: ["$p95", 0] },

                errorRate: {
                    $round: [
                        {
                            $multiply: [
                                { $divide: ["$errorCount", "$totalRequest"] },
                                100
                            ]
                        },
                        2
                    ]
                }
            }
        }
    ])

    return result[0] || {
        totalRequest: 0,
        avgLatency: 0,
        p95: 0,
        errorRate: 0
    }
}

module.exports = { getEndpointAggregation,getServiceSummary }
