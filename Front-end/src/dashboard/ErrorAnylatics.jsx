import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

 const ErrorAnalytics = ({ data }) => {
console.log("Error")
  if (!data) return null;

  const { statusCodes = [], endpoints = [] } = data;

  const totalErrors = statusCodes.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-6">

      <h2 className="text-lg font-semibold text-indigo-400">
        Error Analytics
      </h2>

      <div className="bg-[#0B1020] border border-red-500/30 rounded-xl p-5">

        <p className="text-sm text-slate-400">Total Errors (1h)</p>

        <h2 className="text-3xl font-bold text-red-400">
          {totalErrors}
        </h2>

      </div>

      <div className="bg-[#0B1020] border border-white/10 rounded-xl p-5 h-[280px]">

        <p className="text-sm text-slate-400 mb-3">
          Error Status Codes
        </p>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statusCodes}>

            <XAxis
              dataKey="statusCode"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>


      <div className="bg-[#0B1020] border border-white/10 rounded-xl p-5">

        <p className="text-sm text-slate-400 mb-3">
          Top Failing Endpoints
        </p>

        <div className="space-y-2">

          {endpoints
            .sort((a, b) => b.errorCount - a.errorCount)
            .slice(0, 6)
            .map((e, i) => (

              <div
                key={i}
                className="flex justify-between items-center bg-[#12172A] border border-[#1F2937] rounded-md px-3 py-2"
              >

                <span className="text-xs text-slate-300">
                  {e.endpoint}
                </span>

                <span className="text-xs font-semibold text-red-400">
                  {e.errorCount}
                </span>

              </div>

            ))}

        </div>

      </div>

    </div>
  );
};

export default React.memo(ErrorAnalytics);