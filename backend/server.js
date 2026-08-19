require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const { startCanSimulator } = require('./simulator/canEngine');

const app = express();
const server = http.createServer(app);

// Initialize Gemini AI Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/autostream_db';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Database Connection Error:', err.message));

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`[Cockpit Dashboard Connected]: ${socket.id}`);


  
socket.on('inject_fault', (faultType) => {
  console.log(`[Fault Injected from HUD]: ${faultType}`);
  
  // Pass command to CAN Simulator engine
  const { handleFaultInjection } = require('./simulator/canEngine');
  if (typeof handleFaultInjection === 'function') {
    handleFaultInjection(faultType);
  }
});

  // Handle incoming remote commands from React HUD
  socket.on('vehicle_command', (cmd) => {
    console.log(`[Remote Action Executed]:`, cmd);
    socket.emit('command_ack', { status: 'success', executed: cmd });
  });

  socket.on('disconnect', () => {
    console.log(`[Cockpit Disconnected]: ${socket.id}`);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date() });
});

// AI Diagnostic Endpoint
app.post('/api/diagnose', async (req, res) => {
  try {
    const { activeDtc, telemetry } = req.body;

    if (!activeDtc || activeDtc.length === 0) {
      return res.json({
        safeToDrive: 'SAFE',
        summary: 'All vehicle CAN bus telemetry parameters are within nominal operating thresholds.',
        faults: []
      });
    }

    const prompt = `
You are an expert Autonomous & Software-Defined Vehicle (SDV) Diagnostic Engineer. 
Analyze the following CAN bus vehicle telemetry snapshot and active Diagnostic Trouble Codes (DTCs):

Active DTC Codes: ${JSON.stringify(activeDtc)}
Telemetry Data:
- Speed: ${telemetry?.speedKmh ?? 0} km/h
- Engine RPM: ${telemetry?.engineRpm ?? 0}
- Battery SOC: ${telemetry?.batterySocPercent ?? 0}%
- Coolant Temp: ${telemetry?.coolantTempC ?? 0}°C
- Tire Pressures (PSI): FL=${telemetry?.tirePressurePsi?.fl ?? 'N/A'}, FR=${telemetry?.tirePressurePsi?.fr ?? 'N/A'}, RL=${telemetry?.tirePressurePsi?.rl ?? 'N/A'}, RR=${telemetry?.tirePressurePsi?.rr ?? 'N/A'}

Respond ONLY with valid JSON in the following strict schema:
{
  "safeToDrive": "SAFE" | "CAUTION" | "DANGER",
  "summary": "Brief 1-2 sentence executive assessment of vehicle health.",
  "faults": [
    {
      "code": "DTC Code",
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "title": "Short title of issue",
      "rootCause": "Technical explanation of what failed on CAN bus or sensor layer",
      "recommendedAction": "Immediate steps driver or automated system should take"
    }
  ]
}
`;

   const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: {
    responseMimeType: 'application/json'
  }
});

    const diagnosticResult = JSON.parse(response.text);
    res.json(diagnosticResult);
  } catch (error) {
    console.error('[Gemini AI Error]:', error.message);
    res.status(500).json({ error: 'Failed to generate diagnostic report', details: error.message });
  }
});

// Start CAN engine & express server
startCanSimulator(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 AutoStream CAN Bus Engine active on port ${PORT}`);
});