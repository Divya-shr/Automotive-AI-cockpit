import React from 'react';
import { Activity, Battery, Gauge, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ClusterHUD({ telemetry, isConnected }) {
  if (!telemetry) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 animate-pulse">
        Waiting for CAN Telemetry Stream...
      </div>
    );
  }

  const { speedKmh, engineRpm, batterySocPercent, coolantTempC, gear, tirePressurePsi, activeDtc } = telemetry;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex justify-between items-center bg-gray-900/80 backdrop-blur border border-gray-800 p-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
          <h1 className="text-xl font-bold tracking-wider text-gray-100">AUTOSTREAM SDV COCKPIT</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500'}`} />
          <span className="text-xs font-mono uppercase text-gray-400">
            {isConnected ? 'CAN STREAM LIVE (10 Hz)' : 'DISCONNECTED'}
          </span>
        </div>
      </div>

      {/* Primary Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Speedometer */}
        <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl text-center relative overflow-hidden">
          <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest">Vehicle Speed</div>
          <div className="text-6xl font-black text-white font-mono tracking-tighter my-2">
            {speedKmh}
          </div>
          <div className="text-sm font-semibold text-gray-400">KM/H</div>
          <div className="mt-4 flex justify-between text-xs text-gray-500 font-mono">
            <span>GEAR: <strong className="text-cyan-400 text-sm">{gear}</strong></span>
            <span>LIMIT: 160 KM/H</span>
          </div>
        </div>

        {/* Tachometer (RPM) */}
        <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl text-center relative overflow-hidden">
          <div className="text-xs font-mono text-purple-400 mb-2 uppercase tracking-widest">Engine Speed</div>
          <div className="text-6xl font-black text-white font-mono tracking-tighter my-2">
            {engineRpm}
          </div>
          <div className="text-sm font-semibold text-gray-400">RPM</div>
          <div className="w-full bg-gray-800 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-100" 
              style={{ width: `${Math.min(100, (engineRpm / 6500) * 100)}%` }}
            />
          </div>
        </div>

        {/* Battery & Thermal */}
        <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <span>Battery State of Charge</span>
              <Battery className="w-4 h-4" />
            </div>
            <div className="text-4xl font-bold text-white font-mono">{batterySocPercent}%</div>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300" 
                style={{ width: `${batterySocPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-sm">
            <span className="text-gray-400">Coolant Temp:</span>
            <span className={`font-mono font-bold ${coolantTempC > 100 ? 'text-red-400' : 'text-emerald-400'}`}>
              {coolantTempC} °C
            </span>
          </div>
        </div>
      </div>

      {/* Diagnostics & Tire Pressure Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tire Pressure Panel */}
        <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-xl">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">Tire Pressure Monitor (PSI)</h3>
          <div className="grid grid-cols-2 gap-4 text-center font-mono">
            <div className={`p-3 rounded-lg border ${tirePressurePsi.fl < 29 ? 'border-red-500/50 bg-red-950/20 text-red-400' : 'border-gray-800 bg-gray-800/40'}`}>
              <div className="text-xs text-gray-500">FRONT LEFT</div>
              <div className="text-xl font-bold">{tirePressurePsi.fl}</div>
            </div>
            <div className={`p-3 rounded-lg border ${tirePressurePsi.fr < 29 ? 'border-red-500/50 bg-red-950/20 text-red-400' : 'border-gray-800 bg-gray-800/40'}`}>
              <div className="text-xs text-gray-500">FRONT RIGHT</div>
              <div className="text-xl font-bold">{tirePressurePsi.fr}</div>
            </div>
            <div className={`p-3 rounded-lg border ${tirePressurePsi.rl < 29 ? 'border-red-500/50 bg-red-950/20 text-red-400' : 'border-gray-800 bg-gray-800/40'}`}>
              <div className="text-xs text-gray-500">REAR LEFT</div>
              <div className="text-xl font-bold">{tirePressurePsi.rl}</div>
            </div>
            <div className={`p-3 rounded-lg border ${tirePressurePsi.rr < 29 ? 'border-red-500/50 bg-red-950/20 text-red-400' : 'border-gray-800 bg-gray-800/40'}`}>
              <div className="text-xs text-gray-500">REAR RIGHT</div>
              <div className="text-xl font-bold">{tirePressurePsi.rr}</div>
            </div>
          </div>
        </div>

        {/* Active DTC Fault Banner */}
        <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-xl flex flex-col justify-between">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Active OBD-II Fault Codes</h3>
          {activeDtc && activeDtc.length > 0 ? (
            <div className="space-y-2 my-auto">
              {activeDtc.map((code) => (
                <div key={code} className="flex items-center space-x-3 bg-red-950/40 border border-red-500/30 p-3 rounded-lg text-red-400">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-mono font-bold text-sm">FAULT CODE: {code}</div>
                    <div className="text-xs text-red-300/80">Anomaly detected on CAN Bus. Pending Agentic AI Diagnostic resolution.</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-emerald-400 my-auto py-6">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-sm font-semibold">ALL SYSTEMS NOMINAL</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}