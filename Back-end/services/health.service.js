function calculateHealth(data) {

  if (data.errorRate >= 10) return "CRITICAL";
  if (data.errorRate >= 2) return "WARNING";

  if (data.p95 > 2000 || data.avgLatency > 1500) return "CRITICAL";

  if (data.p95 > 800 || data.avgLatency > 600) return "WARNING";

  if (data.p95 > 400) return "LOW";

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
