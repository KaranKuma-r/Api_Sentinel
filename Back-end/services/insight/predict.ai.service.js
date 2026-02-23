const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateAIInsight = async (contexts) => {

  const prompt = `
You are an expert observability AI.

Return ONLY valid JSON array.

Fields:
endpoint
severity
issue
reason
action

Data:
${JSON.stringify(contexts)}
`;

  const res = await client.chat.completions.create({
    model: "gpt-5-nano",
    messages: [{ role: "user", content: prompt }]
  });

  const text = res.choices[0].message.content;

  const cleaned = text.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);
};