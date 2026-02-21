const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateAIInsight = async (context) => {

  const prompt = `
You are an observability AI.

Analyze:

Endpoint: ${context.endpoint}
P95 latency: ${context.p95}
Average latency: ${context.avgLatency}
Error rate: ${context.errorRate}%
Request count: ${context.requestCount}
Latency trend: ${context.latencyTrend.join(",")}

Time to slow threshold: ${context.timeToSlow || "stable"}

Explain:
- what is happening
- why it is happening
- severity
- future risk
`;

  const res = await client.chat.completions.create({
    model: "gpt-5-nano",
    messages: [{ role: "user", content: prompt }]
  });

  return res.choices[0].message.content;

};