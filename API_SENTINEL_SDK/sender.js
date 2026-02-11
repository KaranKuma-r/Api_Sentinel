const axios = require("axios")

function sendMetric(metric, config) {
  axios.post(
    config.endpoint,
    metric,
    {
      headers: {
        Authorization: `Agent ${config.agentKey}`,
        "Content-Type": "application/json"
      },
      timeout: 1000
    }
  ).catch((err) => {
  if (process.env.SENTINEL_DEBUG === "true") {
    console.error("[AI-SENTINEL SDK]", err.message)
  }
})
}

module.exports =  sendMetric 

