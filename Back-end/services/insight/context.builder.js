exports.buildContext = (aggData, tsData) => {

  return aggData.map(item => {

    const latencyTrend = tsData
      .filter(t => t.endpoint === item.endpoint)
      .map(t => t.avgLatency);

    return {
      endpoint: item.endpoint,
      p95: item.p95,
      avgLatency: item.avgLatency,
      errorRate: item.errorRate,
      requestCount: item.totalRequest,
      latencyTrend
    };

  });

};