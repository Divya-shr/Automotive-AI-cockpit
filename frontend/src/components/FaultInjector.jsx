import React, { useState } from 'react';
import { Zap, Flame, Disc, RotateCcw, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function FaultInjector({ socket }) {
  const [activePreset, setActivePreset] = useState(null);

  const injectFault = (faultType) => {
    setActivePreset(faultType === 'CLEAR_ALL' ? null : faultType);
    if (socket) {
      socket.emit('inject_fault', faultType);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 bg-gray-900/60 border border-gray-800 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-100 font-mono tracking-wide">CAN BUS FAULT INJECTOR</h3>
            <p className="text-xs text-gray-400">Force CAN bus telemetry anomalies to evaluate 3D Twin highlights and Gemini AI diagnostics</p>
          </div>
        </div>

        {activePreset && (
          <span className="flex items-center space-x-1 text-xs font-mono px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>ANOMALY ACTIVE: {activePreset}</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Rear-Left Tire Puncture */}
        <button
          onClick={() => injectFault('TIRE_RL_LOW')}
          className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activePreset === 'TIRE_RL_LOW'
              ? 'border-red-500 bg-red-950/40 text-red-400 shadow-lg shadow-red-950/50'
              : 'border-gray-800 bg-gray-950/40 hover:border-red-500/50 hover:bg-red-950/20 text-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <Disc className="w-5 h-5 text-red-400" />
            <span className="font-mono text-[10px] font-bold bg-black/40 px-2 py-0.5 rounded border border-current">C0035</span>
          </div>
          <div>
            <div className="font-mono font-bold text-sm text-gray-100">Low Tire Pressure</div>
            <div className="text-xs text-gray-400 mt-1">Drops RL pressure to 20.2 PSI</div>
          </div>
        </button>

        {/* Thermal Overheat */}
        <button
          onClick={() => injectFault('ENGINE_OVERHEAT')}
          className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activePreset === 'ENGINE_OVERHEAT'
              ? 'border-orange-500 bg-orange-950/40 text-orange-400 shadow-lg shadow-orange-950/50'
              : 'border-gray-800 bg-gray-950/40 hover:border-orange-500/50 hover:bg-orange-950/20 text-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="font-mono text-[10px] font-bold bg-black/40 px-2 py-0.5 rounded border border-current">P0217</span>
          </div>
          <div>
            <div className="font-mono font-bold text-sm text-gray-100">Engine Overheat</div>
            <div className="text-xs text-gray-400 mt-1">Spikes coolant temperature to 118 °C</div>
          </div>
        </button>

        {/* Cylinder Misfire */}
        <button
          onClick={() => injectFault('MISFIRE')}
          className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activePreset === 'MISFIRE'
              ? 'border-amber-500 bg-amber-950/40 text-amber-400 shadow-lg shadow-amber-950/50'
              : 'border-gray-800 bg-gray-950/40 hover:border-amber-500/50 hover:bg-amber-950/20 text-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="font-mono text-[10px] font-bold bg-black/40 px-2 py-0.5 rounded border border-current">P0300</span>
          </div>
          <div>
            <div className="font-mono font-bold text-sm text-gray-100">Cylinder Misfire</div>
            <div className="text-xs text-gray-400 mt-1">Fluctuates RPM to 4800+</div>
          </div>
        </button>

        {/* Reset ECU */}
        <button
          onClick={() => injectFault('CLEAR_ALL')}
          className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-2">
            <RotateCcw className="w-5 h-5 text-emerald-400" />
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="font-mono font-bold text-sm text-emerald-300">Reset ECU / Clear DTC</div>
            <div className="text-xs text-emerald-400/70 mt-1">Restores nominal CAN sensor telemetry</div>
          </div>
        </button>
      </div>
    </div>
  );
}