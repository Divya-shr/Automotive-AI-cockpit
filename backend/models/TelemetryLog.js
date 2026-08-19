const mongoose = require('mongoose');

const TelemetryLogSchema = new mongoose.Schema(
  {
    vin: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    telemetry: {
      speedKmh: { type: Number, required: true },
      engineRpm: { type: Number, required: true },
      batterySocPercent: { type: Number, required: true },
      coolantTempC: { type: Number, required: true },
      gear: { type: String, required: true },
      tirePressurePsi: {
        fl: Number,
        fr: Number,
        rl: Number,
        rr: Number
      },
      doors: {
        driver: String,
        passenger: String,
        trunk: String
      },
      activeDtc: [String]
    }
  },
  {
    // Auto-deletes logs older than 7 days to manage free MongoDB storage
    expireAfterSeconds: 604800
  }
);

module.exports = mongoose.model('TelemetryLog', TelemetryLogSchema);