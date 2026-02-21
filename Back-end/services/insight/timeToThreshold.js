exports.calculateTimeToThreshold = (latencyTrend, threshold = 1000) => {

  if (!latencyTrend || latencyTrend.length < 2) return null;

  const first = latencyTrend[0];
  const last = latencyTrend[latencyTrend.length - 1];

  const slope = (last - first) / latencyTrend.length;

  if (slope <= 0) return null;

  const time = (threshold - last) / slope;

  return Math.round(time);
};