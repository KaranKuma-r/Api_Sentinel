const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateAIInsight = async (contexts) => {

const prompt = `
You are a senior SRE observability AI.

Explain system behaviour like a human DevOps engineer.
Use simple and clear English.

IMPORTANT:
The monitoring system has already calculated the severity.

Use the "severity" field from the input exactly as provided.
Do NOT change the severity.

Your job is to explain WHY the endpoint received that severity.

For each endpoint provide:

1. Severity explanation
Explain why the monitoring system marked it as this severity.

2. Latency Trend
IMPROVING
DEGRADING
STABLE

3. Future Risk Prediction

timeToSlow:
ALREADY_SLOW
SOON
SAFE

4. Root Cause Analysis

Use these signals:
- statusCodes
- errorCount
- p95
- errorRate
- latencyTrend
- requestCount

Root cause must be one of:

EXTERNAL_API
DATABASE
HIGH_TRAFFIC
SERVER_RESOURCE
NETWORK
CLIENT_ERROR
UNKNOWN

Rules:

• Many 5xx errors → SERVER_RESOURCE or EXTERNAL_API
• Very high latency (>3000ms) → EXTERNAL_API
• 4xx errors → CLIENT_ERROR
• High requestCount + rising latency → HIGH_TRAFFIC
• Latency increasing with no errors → DATABASE or SERVER_RESOURCE
• Spiky latency → NETWORK

5. Explain clearly WHY the system is slow or failing.

Use actual numbers.

Bad example:
"High latency detected"

Good example:
"124 requests returned 500 errors which indicates the external API is failing."

6. Give a short TITLE like a monitoring alert.

7. Give a SHORT developer-friendly SUMMARY.

8. Give a clear ACTION that a backend developer can do.

9. Confidence (0-100)

Tone:
- Human explanation
- No buzzwords
- Short sentences

Return ONLY valid JSON array.

Fields:

endpoint
severity
title
summary
trend
timeToSlow
timeToSlowText
rootCause
reason
action
confidence

Data:
${JSON.stringify(contexts)}
`;

  const res = await client.chat.completions.create({
    model: "gpt-5-nano",
    messages: [{ role: "user", content: prompt }]
  });
console.log("🤖 AI CALLED");
  const text = res.choices[0].message.content;

  const cleaned = text.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
};