function calculateHealth(data) {

  if (data.errorRate >= 5) return "CRITICAL";
  if (data.errorRate >= 1) return "WARNING";

  if (data.p95 > 1500 || data.avgLatency > 1000) return "CRITICAL";

  if (data.p95 > 800 || data.avgLatency > 500) return "WARNING";

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
