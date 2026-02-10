const { sendMetric } = require("./sender")

module.exports = function sentinelMiddleware(config) {
  return function (req, res, next) {

    const startTime = process.hrtime.bigint()

    res.on("finish", () => {
      const endTime = process.hrtime.bigint()
      const responseTimeMs = Number(endTime - startTime) / 1_000_000

      const metric = {
        serviceName: config.serviceName,
        endpoint: req.route?.path || req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        responseTimeMs: responseTimeMs,
        timestamp: new Date().toISOString()
      }

      sendMetric(metric, config)
    })

    next()
  }
}
