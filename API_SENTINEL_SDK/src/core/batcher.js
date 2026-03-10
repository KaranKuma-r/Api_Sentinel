const sendMetric = require("./sender")

const buffer = []

const MAX_BATCH_SIZE = 50
const FLUSH_INTERVAL = 5000

let lastConfig = null

function addMetric(metric, config) {

  buffer.push(metric)
  lastConfig = config

  if (buffer.length >= MAX_BATCH_SIZE) {
    flush()
  }

}

function flush() {

  if (buffer.length === 0) return

  const metrics = buffer.splice(0, buffer.length)

  console.log(`🚀 Flushing ${metrics.length} metrics`)

  setImmediate(() => {

    metrics.forEach(metric => {
      sendMetric(metric, lastConfig)
    })

  })

}

setInterval(() => {
  flush()
}, FLUSH_INTERVAL)

module.exports = addMetric