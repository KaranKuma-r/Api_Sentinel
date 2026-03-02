const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateAIInsight = async (contexts) => {

const prompt = `
You are a senior SRE observability AI.

Explain system behaviour like a human DevOps engineer.
Use very simple and clear English.

Your goals for EACH endpoint:

1. Health Summary
   - Is it HEALTHY, WARNING, or CRITICAL?

2. Latency Trend
   - IMPROVING
   - DEGRADING
   - STABLE

3. Future Risk Prediction
   timeToSlow:
   - ALREADY_SLOW → currently bad
   - SOON → will degrade if trend continues
   - SAFE → no risk

4. Detect the REAL ROOT CAUSE using these signals:
   - statusCodes
   - errorCount
   - p95
   - errorRate
   - latencyTrend
   - requestCount

Root cause must be ONE of:

EXTERNAL_API  
DATABASE  
HIGH_TRAFFIC  
SERVER_RESOURCE  
NETWORK  
CLIENT_ERROR  
UNKNOWN  

Root cause rules:

• Many 5xx errors → SERVER_RESOURCE or EXTERNAL_API  
• Very high latency (>3000ms) → EXTERNAL_API  
• 4xx errors → CLIENT_ERROR  
• High requestCount + rising latency → HIGH_TRAFFIC  
• Latency increasing with no errors → DATABASE or SERVER_RESOURCE  
• Spiky latency → NETWORK  

5. MOST IMPORTANT → Answer this in plain English:

 WHY is this slow or failing?

Not generic. Use the actual numbers.

Bad example:
"High latency detected"

Good example:
"756 requests are failing with 500 errors. This usually means the external API or backend is crashing."

6. Give a short TITLE like a monitoring alert.

7. Give a SHORT developer-friendly SUMMARY.

8. Give a clear ACTION that a backend developer can do.

9. Confidence (0-100)

Tone:
- Talk like a human
- No robotic language
- No long paragraphs
- No buzzwords

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