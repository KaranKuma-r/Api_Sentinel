function getTimeRange(range) {
  const now = new Date();

  switch (range) {
    case "5m":
      return { startTime: new Date(now - 5 * 60 * 1000), unit: "second" };

    case "1h":
      return { startTime: new Date(now - 60 * 60 * 1000), unit: "minute" };

    case "24h":
      return { startTime: new Date(now - 24 * 60 * 60 * 1000), unit: "hour" };

    default:
      return { startTime: new Date(now - 60 * 60 * 1000), unit: "minute" };
  }
}

module.exports = { getTimeRange };
