export const Endpoints = ({ data = [] }) => {

const getStatusStyle = (status) => {
    switch (status) {
      case "HEALTHY":
        return "text-emerald-400 bg-emerald-400/10";

      case "LOW":
      return "text-blue-400 bg-blue-400/10";
  
      case "WARNING":
        return "text-amber-400 bg-amber-400/10";

      case "CRITICAL":
        return "text-rose-400 bg-rose-400/10";

      default:
        return "text-slate-400 bg-slate-400/10";
    }
  };


  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">

      <h2 className="text-lg font-semibold mb-4 text-indigo-400">
        Endpoint Performance
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="text-slate-400 border-b border-white/10">
            <tr>
              <th className="text-left py-2">Endpoint</th>
              <th>Requests</th>
              <th>Avg Latency</th>
              <th>P95</th>
              <th>Error %</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td className="py-3 text-indigo-300 font-medium">
                  {item.endpoint}
                </td>

                <td className="text-center">{item.totalRequest}</td>

                <td className="text-center">
                  {item.avgLatency.toFixed(0)} ms
                </td>

                <td className="text-center">
                  {item.p95.toFixed(0)} ms
                </td>

                <td className="text-center text-rose-400">
                  {item.errorRate.toFixed(1)}%
                </td>

                <td className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
};