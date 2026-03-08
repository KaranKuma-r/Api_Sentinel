const { buildContext } = require("./context.builder");
const { calculateTimeToThreshold } = require("./timeToThreshold");
const { generateAIInsight } = require("./predict.ai.service");

exports.buildInsights = async (aggData, tsData, errorStatusData) => {

  const contexts = buildContext(aggData, tsData, errorStatusData);

  const enriched = contexts.map(ctx => {
    const time = calculateTimeToThreshold(ctx.latencyTrend);

    return {
      ...ctx,
      timeToSlow:
        ctx.severity === "CRITICAL"
          ? "Immediate"
          : ctx.severity === "WARNING"
            ? "Soon"
            : time > 0
              ? time
              : "Stable"
    };
  });

  const healthy = enriched
    .filter(c => c.severity === "HEALTHY" && c.timeToSlow === "Stable")
    .map(c => ({
      endpoint: c.endpoint,
      requestCount: c.requestCount,
      severity: "HEALTHY",
      message: "All good",
      prediction: "Endpoint expected to remain stable if traffic pattern does not change.",
      timeToSlow: "Stable",
      latencyTrend: c.latencyTrend,
      statusCodes: c.statusCodes || [],
      errorCount: c.errorCount || 0,
      confidence: 100
    }));

  const unhealthy = enriched.filter(
    c => !(c.severity === "HEALTHY" && c.timeToSlow === "Stable")
  );

  let aiResults = [];

  if (unhealthy.length) {

    const aiPayload = unhealthy.map(c => ({
      endpoint: c.endpoint,
      severity: c.severity,
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
      console.log("Message value:", r.summary, r.title);

      const original = unhealthy.find(u => u.endpoint === r.endpoint);

      return {
        endpoint: r.endpoint,
        requestCount: original?.requestCount || 0,
        severity: original?.severity || "LOW",
        message: r.summary || r.title,
        reason: r.reason,
        action: r.action,
        prediction: r.prediction,
        confidence: r.confidence || 70,
        latencyTrend: original?.latencyTrend || [],
        timeToSlow: original?.timeToSlow,
        statusCodes: original?.statusCodes || [],
        errorCount: original?.errorCount || 0
      };
    });
  }
  return [...healthy, ...aiResults];
};