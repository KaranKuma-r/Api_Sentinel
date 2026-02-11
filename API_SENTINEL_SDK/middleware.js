const sendMetric = require("./sender")
const shouldIgnore = require("./utlis/Ignore")
const normalizePath = require("./utlis/normalizePath")

module.exports = function sentinelMiddleware(config) {

  const sampleRate = config.sampleRate ?? 1

  return function (req, res, next) {

    if (shouldIgnore(req, config)) {
      return next()
    }

    if (Math.random() > sampleRate) {
      return next()
    }

    const startTime = process.hrtime.bigint()

    res.on("finish", () => {
      try {
        const endTime = process.hrtime.bigint()
        const responseTimeMs = Number(endTime - startTime) / 1_000_000

        const metric = {
          serviceName: config.serviceName,
          endpoint: normalizePath(req.route?.path || req.originalUrl),
          method: req.method,
          statusCode: res.statusCode,
          responseTimeMs,
          error: res.statusCode >= 400,
          timestamp: new Date(),
          sdkVersion: "1.0.0"
        }

        sendMetric(metric, config)

      } catch (err) {
        if (process.env.SENTINEL_DEBUG === "true") {
          console.error("[AI-SENTINEL SDK ERROR]", err.message)
        }
      }
    })

    next()
  }
}
