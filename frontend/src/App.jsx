import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import SDVDashboard from './components/SDVDashboard';
import FaultInjector from './components/FaultInjector';
import AIAssistant from './components/AIAssistant';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export default function App() {
  const [telemetry, setTelemetry] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    setSocketInstance(socket);

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('can_telemetry', (data) => {
      setTelemetry(data.telemetry);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0e14] py-6 px-4 text-gray-100 space-y-6">
      {/* Real-time SDV Cockpit Dashboard */}
      <SDVDashboard telemetry={telemetry} isConnected={isConnected} />

      {/* CAN Bus Anomaly Injection Panel */}
      <FaultInjector socket={socketInstance} />

      {/* Gemini Agentic AI Diagnostic Assistant */}
      <AIAssistant telemetry={telemetry} />
    </main>
  );
}