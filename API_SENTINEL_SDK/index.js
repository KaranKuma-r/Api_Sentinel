const middleware = require("./middleware")

module.exports = function sentinel(config) {
  if (!config) {
    throw new Error("SDK config is required")
  }

  const { agentKey, serviceName, endpoint } = config

  if (!agentKey || !serviceName || !endpoint) {
    throw new Error("agentKey, serviceName and endpoint are required")
  }

  return middleware(config)
}
