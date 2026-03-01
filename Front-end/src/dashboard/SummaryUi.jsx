export default function SummaryUI({ data }) {

  const statusColor =
    data.status === "healthy"
      ? "text-emerald-400"
      : data.status === "warning"
      ? "text-amber-400"
      : "text-rose-400";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

      <div className="bg-[#0B1020] border border-[#1F2937] rounded-xl p-5">
        <p className="text-sm text-slate-400 mb-1">Total Requests</p>
        <h2 className="text-2xl font-semibold text-cyan-400">
          {data.totalRequest}
        </h2>
      </div>

      <div className="bg-[#0B1020] border border-[#1F2937] rounded-xl p-5">
        <p className="text-sm text-slate-400 mb-1">Avg Latency</p>
        <h2 className="text-2xl font-semibold text-violet-400">
          {data.avgLatency} ms
        </h2>
      </div>

      <div className="bg-[#0B1020] border border-[#1F2937] rounded-xl p-5">
        <p className="text-sm text-slate-400 mb-1">Error Rate</p>
        <h2 className="text-2xl font-semibold text-amber-400">
          {data.errorRate}%
        </h2>
      </div>

      <div className="bg-[#0B1020] border border-[#1F2937] rounded-xl p-5">
        <p className="text-sm text-slate-400 mb-1">Status</p>
        <h2 className={`text-2xl font-semibold capitalize ${statusColor}`}>
          {data.status}
        </h2>
      </div>

    </div>
  );
}