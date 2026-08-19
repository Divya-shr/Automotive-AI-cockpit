import React, { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, ShieldCheck, ShieldAlert, Loader2, Wrench, RefreshCw } from 'lucide-react';

export default function AIAssistant({ telemetry }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeDtc = telemetry?.activeDtc || [];

  const runDiagnostics = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeDtc, telemetry })
      });

      if (!response.ok) throw new Error('Failed to fetch AI diagnosis');

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SAFE':
        return <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono"><ShieldCheck className="w-3.5 h-3.5" /> <span>SAFE TO DRIVE</span></span>;
      case 'CAUTION':
        return <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 font-mono"><AlertTriangle className="w-3.5 h-3.5" /> <span>SERVICE ADVISORY</span></span>;
      case 'DANGER':
        return <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 font-mono animate-pulse"><ShieldAlert className="w-3.5 h-3.5" /> <span>PULL OVER IMMEDIATELY</span></span>;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500/50 bg-red-950/30 text-red-400';
      case 'HIGH': return 'border-orange-500/50 bg-orange-950/30 text-orange-400';
      case 'MEDIUM': return 'border-amber-500/50 bg-amber-950/30 text-amber-400';
      default: return 'border-cyan-500/50 bg-cyan-950/30 text-cyan-400';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 bg-gray-900/60 border border-gray-800 p-6 rounded-2xl">
      {/* Component Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
              Gemini SDV Diagnostic Agent
              <Sparkles className="w-4 h-4 text-purple-400" />
            </h2>
            <p className="text-xs text-gray-400">Real-time CAN telemetry anomaly resolution powered by Google Gemini</p>
          </div>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-purple-400/30 transition shadow-lg shadow-purple-900/20 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing CAN Stream...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>{analysis ? 'Re-Analyze Telemetry' : 'Run Agentic Diagnostics'}</span>
            </>
          )}
        </button>
      </div>

      {/* Error View */}
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-sm mb-4">
          ⚠️ Diagnostic Request Failed: {error}. Check your backend server log and GEMINI_API_KEY.
        </div>
      )}

      {/* Initial State / No Run Yet */}
      {!analysis && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-400/50 animate-pulse" />
          <p className="text-sm font-mono">Click "Run Agentic Diagnostics" to evaluate active DTCs and vehicle physics.</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-950/60 p-4 rounded-xl border border-gray-800 gap-3">
            <div>
              <div className="text-xs text-gray-500 font-mono uppercase">Executive Assessment</div>
              <div className="text-sm text-gray-200 mt-0.5">{analysis.summary}</div>
            </div>
            {getStatusBadge(analysis.safeToDrive)}
          </div>

          {/* Fault Cards */}
          {analysis.faults.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {analysis.faults.map((fault, index) => (
                <div key={index} className={`p-5 rounded-xl border ${getSeverityColor(fault.severity)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <Wrench className="w-4 h-4" />
                      <span className="font-mono font-bold text-sm tracking-wide">{fault.code} — {fault.title}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-black/40 border border-current">
                      {fault.severity} SEVERITY
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400 font-semibold">Root Cause: </span>
                      <span className="text-gray-200">{fault.rootCause}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold">Recommended Action: </span>
                      <span className="text-gray-200">{fault.recommendedAction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-emerald-400 font-mono text-xs flex items-center justify-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>No fault codes detected. Vehicle ECU parameters running within spec.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}