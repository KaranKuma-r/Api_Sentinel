export const SlowEndpoints = ({ data = [] }) => {

  return (
    <div className="bg-[#12172A] border border-[#1F2937] rounded-xl p-6">

      <h2 className="text-lg font-semibold text-white mb-6">
        Slow Endpoints
      </h2>

      <div className="space-y-4">

        {data.map((item, i) => (

          <div
            key={i}
            className="flex items-center justify-between bg-[#0B1020] border border-[#1F2937] rounded-lg p-4 hover:border-indigo-500 transition"
          >
            <div>

              <p className="text-sm text-slate-400">Endpoint</p>

              <p className="text-indigo-400 font-mono text-sm">
                {item.endpoint}
              </p>

            </div>
            <div className="flex gap-8 text-sm">

              <div>
                <p className="text-slate-400">Requests</p>
                <p className="text-white font-semibold">
                  {item.totalRequest}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Avg Latency</p>
                <p className="text-amber-400 font-semibold">
                  {item.avgLatency.toFixed(0)} ms
                </p>
              </div>

              <div>
                <p className="text-slate-400">P95</p>
                <p className="text-red-400 font-semibold">
                  {item.p95.toFixed(0)} ms
                </p>
              </div>

              <div>
                <p className="text-slate-400">Error %</p>
                <p className="text-pink-400 font-semibold">
                  {item.errorRate}%
                </p>
              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};