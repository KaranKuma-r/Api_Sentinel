export const AI_Panel = ({ data }) => {

  if (!data?.insights) {
    return (
      <p className="text-slate-400 text-sm">
        No AI insights available
      </p>
    );
  }

  return (
    <div className="space-y-5">

      {data.insights.map((item, index) => {

        let severityColor = "text-emerald-400 border-emerald-500";

        if (item.severity === "CRITICAL") {
          severityColor = "text-red-400 border-red-500";
        }

        if (item.severity === "WARNING") {
          severityColor = "text-yellow-400 border-yellow-500";
        }

        if (item.severity === "LOW") {
          severityColor = "text-blue-400 border-blue-500";
        }

        return (
          <div
            key={index}
            className={`bg-[#0B1020] border ${severityColor} border-l-4 rounded-lg p-5 hover:border-cyan-400 transition`}
          >

          
            <div className="flex justify-between items-center mb-4">

              <div>
                <p className="text-xs text-slate-500">Endpoint</p>

                <h3 className={`text-sm font-semibold ${severityColor}`}>
                  {item.endpoint}
                </h3>
              </div>

              <span className={`text-xs font-semibold ${severityColor}`}>
                {item.severity}
              </span>

            </div>


    
            <div className="grid grid-cols-3 gap-3 text-xs mb-4">

              <div className="bg-[#12172A] rounded-md p-3 border border-[#1F2937]">
                <p className="text-slate-500">Requests</p>
                <p className="text-white font-semibold">
                  {item.requestCount}
                </p>
              </div>

              <div className="bg-[#12172A] rounded-md p-3 border border-[#1F2937]">
                <p className="text-slate-500">Errors</p>
                <p className="text-white font-semibold">
                  {item.errorCount ?? 0}
                </p>
              </div>

              <div className="bg-[#12172A] rounded-md p-3 border border-[#1F2937]">
                <p className="text-slate-500">Time To Slow</p>

                <p className="text-white font-semibold">
                  {item.timeToSlow === "stable"
                    ? "Stable"
                    : `~${item.timeToSlow}`}
                </p>
              </div>

            </div>

            {item.statusCodes?.length > 0 && (
              <div className="mb-4">

                <p className="text-xs text-slate-500 mb-2">
                  Status Codes
                </p>

                <div className="flex flex-wrap gap-2">

                  {item.statusCodes.map((s, i) => (
                    <span
                      key={i}
                      className="bg-red-900/30 border border-red-500 px-2 py-1 rounded text-xs text-red-400"
                    >
                      {s.statusCode} ({s.count})
                    </span>
                  ))}

                </div>

              </div>
            )}

            {item.latencyTrend && (
              <div className="mb-4">

                <p className="text-xs text-slate-500 mb-2">
                  Latency Trend
                </p>

                <div className="flex flex-wrap gap-2">

                  {item.latencyTrend.map((v, i) => (
                    <span
                      key={i}
                      className="bg-[#12172A] border border-[#1F2937] px-2 py-1 rounded text-xs text-slate-300"
                    >
                      {v} ms
                    </span>
                  ))}

                </div>

              </div>
            )}

            {item.message && (
              <div className="bg-[#12172A] border border-[#1F2937] rounded-md p-4 mt-3">

                <p className="text-xs text-blue-400 font-semibold mb-2">
                  Message
                </p>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.message}
                </p>

              </div>
            )}

            {item.reason && (
              <div className="mt-4">

                <p className="text-xs text-slate-500 mb-1">
                  Reason
                </p>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.reason}
                </p>

              </div>
            )}


            {item.action && (
              <div className="bg-[#12172A] border border-[#1F2937] rounded-md p-4 mt-4">

                <p className="text-xs text-cyan-400 font-semibold mb-2">
                  Suggested Action
                </p>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.action}
                </p>

              </div>
            )}


            {item.prediction && (
              <div className="bg-[#12172A] border border-[#1F2937] rounded-md p-4 mt-4">

                <p className="text-xs text-purple-400 font-semibold mb-2">
                  Future Prediction
                </p>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.prediction}
                </p>

                {item.confidence && (
                  <p className="text-[11px] text-slate-500 mt-2">
                    Confidence: {item.confidence}%
                  </p>
                )}

              </div>
            )}

          </div>
        );
      })}

    </div>
  );
};