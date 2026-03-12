import { useEffect, useState } from "react";
import SummaryUI from "../dashboard/SummaryUi";
import { useParams } from "react-router-dom";
import { getSlowEndpoints, getSummary, getTimeSeriesData, getErrors, getEndpoints, getInsightsAI } from "../api/dasboardApi";
import { TimeSeries } from "../dashboard/TimeSeriesUi";
import { SlowEndpoints } from "../dashboard/SlowUi";
import { ErrorAnalytics } from "../dashboard/ErrorAnylatics";
import { Endpoints } from "../dashboard/EndpointsUI";
import { AI_Panel } from "../dashboard/AI_Panel";



export const ServiceDashboard = () => {

  const { agentKey } = useParams();

  const [data, setData] = useState({});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTime, setAiTime] = useState(null);
  const [nextAiTime, setNextAiTime] = useState(null);

  useEffect(() => {

    let interval;

    const loadAllData = async () => {
      try {
        const [summary, ts, slow, error, endpoints] = await Promise.all([
          getSummary(agentKey),
          getTimeSeriesData(agentKey),
          getSlowEndpoints(agentKey),
          getErrors(agentKey),
          getEndpoints(agentKey),
        ]);

        setData(prev => ({
          ...prev,
          summary: summary.summary,
          timeSeries: ts.timeseries,
          slow: slow.data,
          error: error.data,
          endpoints: endpoints.endpoints,
        }));

      } catch (err) {
        console.log(err);
      }
    };

    if (agentKey) {
      loadAllData();
      interval = setInterval(loadAllData, 10000);
    }

    return () => clearInterval(interval);

  }, [agentKey]);

  const loadAI = async () => {
    try {
      setAiLoading(true);
      const res = await getInsightsAI(agentKey);
      const expireTime = Date.now() + 24 * 60 * 60 * 1000;

      if (res.success) {

        setData(prev => ({
          ...prev,
          ai: res,
          aiMessage: null
        }));

        setAiTime(new Date());

        setNextAiTime(new Date(expireTime));

        localStorage.setItem("aiExpire", expireTime);
        localStorage.setItem("aiData", JSON.stringify(res));

      } else {

        localStorage.setItem("aiMessage", res.message);
        localStorage.setItem("aiExpire", expireTime);

        setData(prev => ({
          ...prev,
          aiMessage: res.message
        }));

        setNextAiTime(new Date(expireTime));

      }

    } catch (error) {

      console.log(error);

    } finally {

      setAiLoading(false);

    }

  };

  useEffect(() => {

    const message = localStorage.getItem("aiMessage");
    const expire = localStorage.getItem("aiExpire");
    const aiData = localStorage.getItem("aiData");

    if (!expire) return;

    if (Date.now() < Number(expire)) {

      if (aiData) {

      setData(prev => ({
        ...prev,
        ai: JSON.parse(aiData)
      }));

    }
      if (message) {

        setData(prev => ({
          ...prev,
          aiMessage: message
        }));

      }

      setNextAiTime(new Date(Number(expire)));

    } else {

      localStorage.removeItem("aiMessage");
      localStorage.removeItem("aiExpire");
      localStorage.removeItem("aiData");

    }

  }, []);


  if (!data.summary)
    return <p className="text-white">Loading...</p>;


  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-200">

      <div className="pt-4 pl-6 pr-4">

        <h1 className="text-3xl font-semibold mb-8 text-white">
          Service Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6">

          {/* LEFT */}
          <div className="col-span-3 space-y-6">

            <div className="bg-[#12172A] border border-[#1F2937] rounded-xl p-6 shadow-lg">
              <SummaryUI data={data.summary} />
            </div>

            <div className="bg-[#12172A] border border-[#1F2937] rounded-xl p-6 shadow-lg">
              <TimeSeries data={data.timeSeries} />
            </div>
            <div className="bg-[#12172A] border border-[#1F2937] rounded-xl p-6 shadow-lg">
              <SlowEndpoints data={data.slow} />
            </div>
            <div className="bg-[#12172A] border border-[#1F2937] rounded-xl p-6 shadow-lg">
              <ErrorAnalytics data={data.error} />
            </div>
            <div className="bg-[#12172A] border border-[#1F2937] rounded-xl p-6 shadow-lg">
              <Endpoints data={data.endpoints} />
            </div>
          </div>

          {/* RIGHT AI PANEL */}

          <div className="col-span-1 w-full">

            <div className="bg-[#12172A] border border-[#1F2937] rounded-xl p-6 sticky top-16 h-[calc(100vh-80px)] w-full flex flex-col">

              {/* HEADER */}

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-base font-semibold text-white">
                  AI Insights
                </h2>

                <div className="flex flex-col items-end text-xs">

                  {aiTime && (
                    <span className="text-slate-400">
                      Generated: {aiTime.toLocaleTimeString()}
                    </span>
                  )}

                  {nextAiTime && (
                    <span style={{ color: "oklch(67.3% 0.182 276.935)" }}>
                     Next Reload AI: <span className="text-slate-400">{nextAiTime.toLocaleString()}</span> 
                    </span>
                  )}

                </div>

                {data.ai && (
                  <button
                    onClick={loadAI}
                    disabled={aiLoading}
                    className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md"
                  >
                    {aiLoading ? "Reloading..." : "Reload"}
                  </button>
                )}

              </div>
              
              {/* CONTENT */}

              <div className="flex-1 overflow-y-auto pr-1">
                {data.aiMessage && (
                  <div className="text-center text-red-400 text-sm mb-4">
                    {data.aiMessage}
                  </div>
                )}
                {!data.ai && !aiLoading && !data.aiMessage && (
                  <div className="space-y-4 text-center">

                    <p className="text-slate-400 text-sm">
                      Generate AI insight for this service
                    </p>

                    <button
                      onClick={loadAI}
                      className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg text-sm font-semibold w-full"
                    >
                      Generate Insight
                    </button>

                  </div>
                )}
                {aiLoading && (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-sm">

                    <div className="animate-spin h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full mb-3"></div>

                    Analyzing service metrics...

                  </div>
                )}
                {!aiLoading && data.ai && (
                  <AI_Panel data={data.ai} />
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};