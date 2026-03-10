const axios = require("axios")

const INGEST_URL =
  "https://api-sentinel-backend-gzlx.onrender.com/api/metrics/ingest"

function sendMetric(metric, config) {

  axios.post(
    INGEST_URL,
    metric,
    {
      headers: {
        Authorization: `Agent ${config.agentKey}`,
        "Content-Type": "application/json"
      },
      timeout: 5000
    }
  )
 
  .catch(err => {

    if (err.response) {
      console.log("Server error:", err.response.status, err.response.data)
    } 
    else if (err.request) {
      console.log("No response from server")
    } 
    else {
      console.log("Axios config error:", err.message)
    }

  })

}

module.exports = sendMetric