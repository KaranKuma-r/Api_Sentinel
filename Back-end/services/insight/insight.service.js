const { buildContext } = require("./context.builder");
const { calculateTimeToThreshold } = require("./timeToThreshold");
const { generateAIInsight } = require("./predict.ai.service");

exports.buildInsights = async (aggData, tsData) => {

  const contexts = buildContext(aggData, tsData);

  const results = [];

  for (const ctx of contexts) {

    const time = calculateTimeToThreshold(ctx.latencyTrend);

    ctx.timeToSlow = time ? `${time} minutes` : "stable";

    const aiMessage = await generateAIInsight(ctx);

    results.push({
      endpoint: ctx.endpoint,
      latencyTrend: ctx.latencyTrend,   
      message: aiMessage,
      timeToSlow: ctx.timeToSlow
    });

  }

  return results;
};