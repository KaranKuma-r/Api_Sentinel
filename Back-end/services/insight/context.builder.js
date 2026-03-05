const { calculateHealth } = require("../health.service");

exports.buildContext = (aggData, tsData, errorStatusData = []) => {

  return aggData.map(item => {

    const latencyTrend = tsData
      .filter(t => t.endpoint === item.endpoint)
      .map(t => Number(t.avgLatency.toFixed(2)))
      .slice(-10);

    const trendDirection =
      latencyTrend.length > 1
        ? latencyTrend[latencyTrend.length - 1] > latencyTrend[0]
          ? "DEGRADING"
          : latencyTrend[latencyTrend.length - 1] < latencyTrend[0]
          ? "IMPROVING"
          : "STABLE"
        : "STABLE";

    const errorMatch = errorStatusData.find(
      e => e.endpoint === item.endpoint
    );

    return {
      endpoint: item.endpoint,
      p95: item.p95,
      avgLatency: item.avgLatency,
      errorRate: item.errorRate,
      requestCount: item.totalRequest,
      severity: calculateHealth({
        p95: item.p95,
        avgLatency: item.avgLatency,
        errorRate: item.errorRate
      }),
      latencyTrend,
      trendDirection,
      statusCodes: errorMatch?.statusCodes || [],
      errorCount: errorMatch?.errorCount || 0
    };

  });

};