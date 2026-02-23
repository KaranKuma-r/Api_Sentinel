function calculateHealth(data) {

  if (data.errorRate > 5) {
    return "CRITICAL";
  }

  if (data.errorRate > 1) {
    return "DEGRADED";
  }

  if (data.p95 > 1000 || data.avgLatency > 700) {
    return "CRITICAL";
  }

  if (data.p95 > 600 || data.avgLatency > 400) {
    return "SLOW";
  }

  return "HEALTHY";
}

function attachHealthStatus(endpoints) {
  return endpoints.map(ep => ({
    ...ep,
    status: calculateHealth(ep)
  }));
}

module.exports = {
  attachHealthStatus,
  calculateHealth
};
