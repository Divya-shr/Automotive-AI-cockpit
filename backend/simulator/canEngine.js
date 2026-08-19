const mongoose = require('mongoose');
const TelemetryLog = require('../models/TelemetryLog');

// Global fault state override reference
let activeFaultOverride = null;

function handleFaultInjection(faultType) {
  activeFaultOverride = faultType;
}

function startCanSimulator(io) {
  // Initial Vehicle Physical State
  let state = {
    speedKmh: 45.0,
    engineRpm: 1800,
    batterySocPercent: 88.5,
    coolantTempC: 85,
    gear: 'D',
    tirePressurePsi: { fl: 32.5, fr: 32.4, rl: 28.2, rr: 32.5 }, // Low RL pressure by default
    doors: { driver: 'closed', passenger: 'closed', trunk: 'closed' }
  };

  let tickCount = 0;

  // Stream low-latency telemetry every 100ms (10 Hz)
  setInterval(async () => {
    tickCount++;

    // Calculate dynamic vehicle physics
    const speedDelta = (Math.random() - 0.48) * 1.5;
    state.speedKmh = Math.min(160, Math.max(0, state.speedKmh + speedDelta));

    if (state.speedKmh === 0) {
      state.engineRpm = 800; // Idle
      state.gear = 'P';
    } else {
      state.engineRpm = Math.min(6500, Math.max(800, state.speedKmh * 38 + (Math.random() * 80 - 40)));
      state.gear = 'D';
    }

    // Battery depletion rate based on speed
    state.batterySocPercent = Math.max(0, state.batterySocPercent - (state.speedKmh > 80 ? 0.002 : 0.0008));
    state.coolantTempC = Math.min(115, 85 + state.speedKmh * 0.15);

    // Apply active fault overrides from UI Fault Injector
    if (activeFaultOverride === 'TIRE_RL_LOW') {
      state.tirePressurePsi.rl = 20.2;
    } else if (activeFaultOverride === 'ENGINE_OVERHEAT') {
      state.coolantTempC = 118;
    } else if (activeFaultOverride === 'MISFIRE') {
      state.engineRpm = 4800;
    } else if (activeFaultOverride === 'CLEAR_ALL') {
      state.tirePressurePsi.rl = 32.5;
      state.coolantTempC = 85;
      activeFaultOverride = null;
    }

    // Trigger OBD-II Diagnostic Trouble Codes dynamically
    const activeDtc = [];
    if (state.tirePressurePsi.rl < 29.0) activeDtc.push('C0035'); // Low Tire Pressure Code
    if (state.speedKmh > 120 || activeFaultOverride === 'MISFIRE') activeDtc.push('P0300'); // Engine Misfire Risk
    if (state.coolantTempC > 105) activeDtc.push('P0217'); // Engine Overtemp

    const canFrame = {
      timestamp: Date.now(),
      vin: '1G1YC2D49R5100000',
      telemetry: {
        speedKmh: parseFloat(state.speedKmh.toFixed(1)),
        engineRpm: Math.round(state.engineRpm),
        batterySocPercent: parseFloat(state.batterySocPercent.toFixed(2)),
        coolantTempC: Math.round(state.coolantTempC),
        gear: state.gear,
        tirePressurePsi: state.tirePressurePsi,
        doors: state.doors,
        activeDtc
      }
    };

    // Broadcast WebSocket packet to all connected dashboards
    io.emit('can_telemetry', canFrame);

    // Log trip snapshot to MongoDB every 5 seconds (every 50 ticks) when DB is connected
    if (tickCount % 50 === 0 && mongoose.connection.readyState === 1) {
      try {
        await TelemetryLog.create({
          vin: canFrame.vin,
          timestamp: new Date(canFrame.timestamp),
          telemetry: canFrame.telemetry
        });
      } catch (err) {
        console.error('[DB Log Error]:', err.message);
      }
    }
  }, 100);
}

module.exports = { startCanSimulator, handleFaultInjection };