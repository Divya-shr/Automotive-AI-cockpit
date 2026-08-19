import React from 'react';
import { AlertTriangle, Bot, RefreshCw, Activity } from 'lucide-react';

export default function SDVDashboard({ telemetry, aiAnalysis, aiLoading, aiError }) {
  const speed = telemetry?.speedKmh ?? 51.7;
  const rpm = telemetry?.engineRpm ?? 1973;
  const battery = telemetry?.batterySocPercent ?? 88.2;
  const coolant = telemetry?.coolantTempC ?? 93;

  const tireFL = telemetry?.tirePressurePsi?.fl ?? 28.2;
  const tireFR = telemetry?.tirePressurePsi?.fr ?? 39.0;
  const tireRL = telemetry?.tirePressurePsi?.rl ?? 28.2; // Low pressure fault
  const tireRR = telemetry?.tirePressurePsi?.rr ?? 27.2;

  return (
    <div className="min-h-screen bg-[#07090e] text-gray-200 p-4 font-sans text-xs">

      {/* NAVBAR HEADER */}
      <header className="flex items-center justify-between pb-3 mb-4 border-b border-[#1b2234]">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
          <h1 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest font-mono">
            Automotive AI Cockpit<span className="text-cyan-400 mx-1.5">|</span> Real-Time CAN Bus Diagnostic Twin
          </h1>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-[10px] font-mono">
          <span className="text-gray-400">VIN: <span className="text-gray-200">SDV-2026-X8</span></span>
          <span className="text-gray-600">|</span>
          <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
            SYSTEM ONLINE
          </span>
        </div>
      </header>

      {/* 1. TOP GAUGES ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
        {/* SPEED */}
        <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-3 flex flex-col items-center justify-between shadow-lg">
          <span className="self-start text-[10px] font-bold text-gray-400 uppercase tracking-wider">SPEED</span>
          <div className="relative w-20 h-20 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-800/80" strokeWidth="2.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-cyan-400" strokeDasharray="51.7, 100" strokeWidth="2.8" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center">
              <div className="text-base font-bold text-white font-mono leading-none">{speed}</div>
              <div className="text-[8px] text-gray-400 mt-0.5">km/h</div>
            </div>
          </div>
        </div>

        {/* RPM */}
        <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-3 flex flex-col items-center justify-between shadow-lg">
          <span className="self-start text-[10px] font-bold text-gray-400 uppercase tracking-wider">RPM</span>
          <div className="relative w-20 h-20 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-800/80" strokeWidth="2.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-purple-400" strokeDasharray="45, 100" strokeWidth="2.8" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center">
              <div className="text-base font-bold text-white font-mono leading-none">{rpm}</div>
              <div className="text-[8px] text-gray-400 mt-0.5">RPM</div>
            </div>
          </div>
        </div>

        {/* BATTERY */}
        <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-3 flex flex-col items-center justify-between shadow-lg">
          <span className="self-start text-[10px] font-bold text-gray-400 uppercase tracking-wider">BATTERY</span>
          <div className="relative w-20 h-20 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-800/80" strokeWidth="2.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-cyan-400" strokeDasharray="88.2, 100" strokeWidth="2.8" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center">
              <div className="text-base font-bold text-white font-mono leading-none">{battery}%</div>
            </div>
          </div>
        </div>

        {/* COOLANT */}
        <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-3 flex flex-col items-center justify-between shadow-lg">
          <span className="self-start text-[10px] font-bold text-gray-400 uppercase tracking-wider">COOLANT</span>
          <div className="relative w-20 h-20 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-800/80" strokeWidth="2.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-cyan-400" strokeDasharray="70, 100" strokeWidth="2.8" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center">
              <div className="text-base font-bold text-white font-mono leading-none">{coolant}°</div>
              <div className="text-[8px] text-gray-400 mt-0.5">°C</div>
            </div>
          </div>
        </div>

        {/* CGIN */}
        <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-3 flex flex-col items-center justify-between shadow-lg">
          <span className="self-start text-[10px] font-bold text-gray-400 uppercase tracking-wider">CGIN</span>
          <div className="relative w-20 h-20 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-800/80" strokeWidth="2.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-cyan-400" strokeDasharray="83, 100" strokeWidth="2.8" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center">
              <div className="text-base font-bold text-white font-mono leading-none">83°</div>
              <div className="text-[8px] text-gray-400 mt-0.5">%</div>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-3 flex flex-col items-center justify-between shadow-lg">
          <span className="self-start text-[10px] font-bold text-gray-400 uppercase tracking-wider">STATUS</span>
          <div className="relative w-20 h-20 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-800/80" strokeWidth="2.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-cyan-400" strokeDasharray="50, 100" strokeWidth="2.8" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center flex items-center space-x-1">
              <span className="text-xs font-bold text-white font-mono">53.7</span>
              <span className="text-xs font-bold text-white font-mono">10.6</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN COCKPIT SECTION */}
      <div className="grid grid-cols-12 gap-4">

        {/* LEFT PANEL: TIRE PRESSURE */}
        <div className="col-span-12 md:col-span-3 space-y-4">
          <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-4 shadow-lg">
            <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2">TIRE PRESSURE</h3>

            <div className="relative flex items-center justify-between py-4 px-2">
              <div className="flex flex-col justify-between h-36 py-1">
                <div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold">FL</div>
                  <div className={`text-xs font-bold font-mono ${tireFL < 29 ? 'text-red-500' : 'text-gray-200'}`}>
                    {tireFL}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold">RL</div>
                  <div className={`text-xs font-bold font-mono ${tireRL < 29 ? 'text-red-500 animate-pulse' : 'text-gray-200'}`}>
                    {tireRL}
                  </div>
                </div>
              </div>

              {/* Blueprint Top View Car Graphic */}
              <div className="w-20 h-36 flex items-center justify-center relative">
                <svg viewBox="0 0 100 200" className="w-full h-full text-slate-700" fill="none">
                  <path d="M 28 35 C 28 15, 72 15, 72 35 L 78 70 L 78 145 C 78 175, 74 185, 68 188 C 50 192, 50 192, 32 188 C 26 185, 22 175, 22 145 L 22 70 Z" fill="#131926" stroke="#252e42" strokeWidth="2" />
                  <path d="M 30 65 C 36 55, 64 55, 70 65 C 68 73, 32 73, 30 65 Z" fill="#090d15" stroke="#1f293d" strokeWidth="1.5" />
                  <path d="M 32 145 C 40 140, 60 140, 68 145 L 66 153 C 55 156, 45 156, 34 153 Z" fill="#090d15" stroke="#1f293d" strokeWidth="1.5" />

                  <rect x="12" y="32" width="9" height="24" rx="3" fill={tireFL < 29 ? '#ef4444' : '#273349'} stroke={tireFL < 29 ? '#f87171' : '#38bdf8'} strokeWidth="1.5" />
                  <rect x="79" y="32" width="9" height="24" rx="3" fill={tireFR < 29 ? '#ef4444' : '#273349'} stroke={tireFR < 29 ? '#f87171' : '#38bdf8'} strokeWidth="1.5" />
                  <rect x="12" y="132" width="9" height="24" rx="3" fill={tireRL < 29 ? '#ef4444' : '#273349'} stroke={tireRL < 29 ? '#f87171' : '#38bdf8'} strokeWidth="1.5" className={tireRL < 29 ? "animate-pulse" : ""} />
                  <rect x="79" y="132" width="9" height="24" rx="3" fill={tireRR < 29 ? '#ef4444' : '#273349'} stroke={tireRR < 29 ? '#f87171' : '#38bdf8'} strokeWidth="1.5" />
                </svg>
              </div>

              <div className="flex flex-col justify-between h-36 py-1 text-right">
                <div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold">FR</div>
                  <div className={`text-xs font-bold font-mono ${tireFR < 29 ? 'text-red-500' : 'text-gray-200'}`}>
                    {tireFR}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold">RR</div>
                  <div className={`text-xs font-bold font-mono ${tireRR < 29 ? 'text-red-500' : 'text-gray-200'}`}>
                    {tireRR}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center border-t border-[#1b2234] pt-2 mt-1">
              <button className="text-[10px] text-gray-500 hover:text-cyan-400 transition">Read more</button>
            </div>
          </div>

          <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-4 min-h-[140px] shadow-lg">
            <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2">RECORD FAULT LABELS</h3>
          </div>
        </div>

        {/* CENTER PANEL: HIGH-TECH 3D EV X-RAY DIAGNOSTIC TWIN */}
        <div className="col-span-12 md:col-span-6">
          <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-4 h-full flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                3D SDV CAN BUS DIAGNOSTIC TWIN
              </h3>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <Activity className="w-2.5 h-2.5 animate-pulse" />
                <span>LIVE TELEMETRY</span>
              </span>
            </div>

            <div className="relative w-full h-[460px] bg-[#0b0e17] rounded-xl flex items-center justify-center overflow-hidden my-auto border border-[#182030]">

              {/* Clean Transparent 3D EV X-Ray Graphic */}
              <img
                src="/image_0.png"
                alt="3D SDV CAN Bus Diagnostic Twin"
                className="w-full h-full object-contain mix-blend-screen scale-105 filter drop-shadow-[0_0_25px_rgba(6,182,212,0.2)] pointer-events-none"
              />

              {/* Engine Fault Callout (Positioned over Front Electric Motor Bay) */}
              <div className="absolute top-[44%] left-[25%] bg-red-950/90 border border-red-500/80 text-red-400 px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)] backdrop-blur-md animate-bounce">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>ENGINE FAULT DETECTED</span>
              </div>

              {/* Rear Left Wheel Fault Callout (Positioned over Illuminated Rear Left Wheel) */}
              <div className="absolute bottom-[23%] right-[24%] bg-red-950/90 border border-red-500/80 text-red-400 px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)] backdrop-blur-md animate-pulse">
                <span>🚨 RL (C0035) FAULT</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: OBD-II FAULTS & GEMINI AGENT */}
        <div className="col-span-12 md:col-span-3 space-y-4">
          <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-4 shadow-lg">
            <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-3">ACTIVE OBD-II FAULT CODES</h3>
            <div className="space-y-1.5 text-[10px] font-mono text-gray-300">
              <p className="flex items-center space-x-1 text-red-400">
                <span>•</span>
                <span>(C0035) Content-Fram: Fault Codes</span>
              </p>
              <p className="flex items-center space-x-1 text-red-400">
                <span>•</span>
                <span>(C0035) FAULT Sockets</span>
              </p>
              <p className="flex items-center space-x-1 text-red-400">
                <span>•</span>
                <span>(C0035) FAULT Panorxrons</span>
              </p>
            </div>
          </div>

          <div className="bg-[#0f131f] border border-[#1b2234] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center space-x-2 border-b border-[#1b2234] pb-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Gemini SDV Diagnostic Agent</h3>
            </div>

            {aiLoading ? (
              <div className="flex items-center space-x-2 text-cyan-400 text-[10px] font-mono py-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Gemini CAN Bus diagnostics...</span>
              </div>
            ) : aiError ? (
              <div className="bg-red-950/60 border border-red-600/80 text-red-400 p-2.5 rounded-lg text-[10px] font-mono space-y-1">
                <div className="flex items-center space-x-1.5 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>Diagnostic Request Failed</span>
                </div>
                <p className="text-[9px] text-red-300 leading-snug">{aiError}</p>
              </div>
            ) : (
              <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                {aiAnalysis || "Gemini SDV Diagnostic Agent is provide automotive telematics dashboard based on image_0.png, where all the SDV Diagnostic Agent basis preserved, and first Gemini SDV authentication. Is a Gemini SDV Diagnostic Agent is replaced untralemss fault."}
              </p>
            )}

            {/* Error Callout Banner */}
            {aiError && (
              <div className="bg-red-950/80 border border-red-500/80 text-red-400 p-2 rounded text-[9px] font-mono flex items-start space-x-1.5">
                <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                <span>Diagnostic Request Failed: Failed to fetch AI diagnosis. Check your backend server log and GEMINI_API_KEY.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}