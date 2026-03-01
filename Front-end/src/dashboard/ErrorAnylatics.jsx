import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";

export const ErrorAnalytics = ({ data }) => {

    if (!data) return null;

    const { statusCodes = [], endpoints = [] } = data;

    const totalErrors = statusCodes.reduce((sum, s) => sum + s.count, 0);
    const mainEndpoint = endpoints[0]?.endpoint;

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                Error Analytics
            </h2>
            
            <div className="bg-[#0B1020] border border-red-500/30 rounded-2xl p-5">

                <p className="text-sm text-slate-400">Total Errors (1h)</p>

                <h2 className="text-3xl font-bold text-red-400">
                    {totalErrors}
                </h2>

                {mainEndpoint && (
                    <p className="text-sm text-slate-400 mt-1">
                        All errors from <span className="text-red-400">{mainEndpoint}</span>
                    </p>
                )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-4 h-[300px]">

                    <p className="text-sm text-slate-400 mb-2">
                        Status Code Distribution
                    </p>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusCodes}>

                            <XAxis
                                dataKey="statusCode"
                                stroke="#94a3b8"
                                label={{
                                    value: "Status Code",
                                    position: "insideBottom",
                                    offset: -5,
                                    fill: "#94a3b8"
                                }}
                            />

                            <YAxis
                                stroke="#94a3b8"
                                label={{
                                    value: "Error Count",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "#94a3b8"
                                }}
                            />

                            <Tooltip />

                            <Bar dataKey="count" fill="#ef4444" radius={[6, 6, 0, 0]} />

                        </BarChart>
                    </ResponsiveContainer>

                </div>

                <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-4 h-[300px]">

                    <p className="text-sm text-slate-400 mb-2">
                        Errors by Endpoint
                    </p>

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={endpoints}
                                dataKey="errorCount"
                                nameKey="endpoint"
                                outerRadius={100}
                                label
                            >
                                {endpoints.map((_, i) => (
                                    <Cell key={i} fill={["#ef4444", "#f97316", "#eab308"][i % 3]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
};