import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const TimeSeries = ({ data = [] }) => {

  const formattedData = useMemo(() => {

    const grouped = {};

    data.forEach(item => {

      const key = item.time;

      if (!grouped[key]) {
        grouped[key] = {
          time: key,
          requestCount: 0,
          errorCount: 0,
          totalLatency: 0
        };
      }

      grouped[key].requestCount += item.requestCount;
      grouped[key].errorCount += item.errorCount;

      grouped[key].totalLatency += item.avgLatency * item.requestCount;

    });

    return Object.values(grouped)
      .sort((a, b) => new Date(a.time) - new Date(b.time))
      .map(d => ({
        time: d.time,
        requestCount: d.requestCount,
        errorCount: d.errorCount,
        avgLatency: Math.round(d.totalLatency / d.requestCount)
      }));

  }, [data]);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-xl">

      <h2 className="text-lg font-semibold mb-4 text-indigo-400">
        Traffic & Performance
      </h2>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
          >

            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />

            <XAxis
              dataKey="time"
              tickFormatter={(t) =>
                new Date(t).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }
              stroke="#475569"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickMargin={12}
              label={{
                value: "Time",
                position: "insideBottom",
                offset: -20,
                fill: "#38bdf8"
              }}
            />

            <YAxis
              yAxisId="left"
              stroke="#22C55E"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{
                value: "Latency (ms)",
                angle: -90,
                position: "insideLeft",
                dx: -10,
                fill: "#22C55E"
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6366F1"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              label={{
                value: "Requests / Errors",
                angle: 90,
                position: "insideRight",
                dx: 10,
                fill: "#6366F1"
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #ffffff10"
              }}
              labelFormatter={(t) =>
                new Date(t).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                })
              }
            />

            <Legend verticalAlign="top" height={36} />

            <Line
              yAxisId="right"
              type="linear"
              dataKey="requestCount"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              name="Requests"
            />

            <Line
              yAxisId="right"
              type="linear"
              dataKey="errorCount"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              name="Errors"
            />

            <Line
              yAxisId="left"
              type="linear"
              dataKey="avgLatency"
              stroke="#22C55E"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              name="Latency (ms)"
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default React.memo(TimeSeries);