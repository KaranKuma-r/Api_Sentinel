function shouldIgnore(req, config) {
  const defaultIgnore = ["/favicon.ico", "/health"]
  const userIgnore = config.ignore || []

  const allIgnore = [...defaultIgnore, ...userIgnore]

  return allIgnore.some(route => {
    if (route instanceof RegExp) {
      return route.test(req.originalUrl)
    }
    return req.originalUrl === route
  })
}

module.exports = shouldIgnore
