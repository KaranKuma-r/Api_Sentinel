const { calculateHealth } = require("../health.service");

exports.buildContext = (aggData, tsData, errorStatusData = []) => {

  return aggData.map(item => {

    const latencyTrend = tsData
      .filter(t => t.endpoint === item.endpoint)
      .map(t => t.avgLatency)
      .slice(-10);

    const errorMatch = errorStatusData.find(
      e => e.endpoint === item.endpoint
    );

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
      latencyTrend,
      statusCodes: errorMatch?.statusCodes || [],
      errorCount: errorMatch?.errorCount || 0
    };
  });
};