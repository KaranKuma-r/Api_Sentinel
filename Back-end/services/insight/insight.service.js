const { buildContext } = require("./context.builder");
const { calculateTimeToThreshold } = require("./timeToThreshold");
const { generateAIInsight } = require("./predict.ai.service");

exports.buildInsights = async (aggData, tsData, errorStatusData) => {

  const contexts = buildContext(aggData, tsData,errorStatusData);

  const enriched = contexts.map(ctx => {
    const time = calculateTimeToThreshold(ctx.latencyTrend);

    return {
      ...ctx,
      timeToSlow: time || "stable"
    };
  });

  const healthy = enriched
    .filter(c => c.status === "HEALTHY" && c.timeToSlow === "stable")
    .map(c => ({
      endpoint: c.endpoint,
      requestCount: c.requestCount,
      severity: "LOW",
      message: "All good",
      timeToSlow: "stable",
      latencyTrend: c.latencyTrend
    }));

  const unhealthy = enriched.filter(
    c => !(c.status === "HEALTHY" && c.timeToSlow === "stable")
  );

  let aiResults = [];

  if (unhealthy.length) {

    const aiPayload = unhealthy.map(c => ({
      endpoint: c.endpoint,
      p95: c.p95,
      errorRate: c.errorRate,
      requestCount: c.requestCount,
      timeToSlow: c.timeToSlow,
      latencyTrend: c.latencyTrend,
      statusCodes: c.statusCodes,
      errorCount: c.errorCount
    }));

    const aiResponse = await generateAIInsight(aiPayload);

    aiResults = aiResponse.map(r => {

      const original = unhealthy.find(u => u.endpoint === r.endpoint);

      return {
        endpoint: r.endpoint,
        requestCount: original?.requestCount || 0,
        severity: r.severity,
        message: r.issue,
        reason: r.reason,
        action: r.action,
        latencyTrend: original?.latencyTrend || [],
        timeToSlow: original?.timeToSlow || "stable",
        statusCodes: original?.statusCodes || [],
        errorCount: original?.errorCount || 0
      };
    });
  }
  return [...healthy, ...aiResults];
};