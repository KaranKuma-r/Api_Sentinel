function attachHealthStatus(endpoints) {

  return endpoints.map(ep => {

    let status = "HEALTHY"

    if (ep.errorRate > 5) {
      status = "UNHEALTHY"
    }
    else if (ep.p95 > 800) {
      status = "SLOW"
    }

    return {
      ...ep,
      status
    }
  })
}

module.exports = { attachHealthStatus }
