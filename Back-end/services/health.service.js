function calculateHealth(data) {

  let status = "HEALTHY";

  if (data.errorRate > 8) {
    status = "UNHEALTHY";
  }
  else if (data.p95 > 1000 || data.avgLatency > 700) {
    status = "UNHEALTHY";
  }
  else if (data.p95 > 600 || data.avgLatency > 400) {
    status = "SLOW";
  }

  return status;
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
