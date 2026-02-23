const { calculateHealth } = require("../health.service");

exports.buildContext = (aggData, tsData) => {

  return aggData.map(item => {

    const latencyTrend = tsData
      .filter(t => t.endpoint === item.endpoint)
      .map(t => t.avgLatency)
      .slice(-3);

    return {
      endpoint: item.endpoint,
      p95: item.p95,
      avgLatency: item.avgLatency,
      errorRate: item.errorRate,
      requestCount: item.totalRequest,
      status: calculateHealth({
        p95: item.p95,
        avgLatency: item.avgLatency,
        errorRate: item.errorRate
      }),
      latencyTrend
    };

  });

};