# 🚗 Automotive AI Cockpit | Real-Time CAN Bus Diagnostic Twin

Real-time smart car dashboard featuring live vehicle sensors, a 3D digital twin, and Gemini AI for instant fault diagnostics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8.svg)
![Gemini AI](https://img.shields.io/badge/Google_Gemini_API-Supported-8e44ad.svg)

---

## 🌟 Key Features

* **Real-Time CAN Bus Telematics Gauges:** Interactive custom SVG gauges tracking Speed, Engine RPM, Battery SOC, Coolant Temperature, CGIN, and overall System Status.
* **Tire Pressure Monitoring System (TPMS):** Visual 4-corner tire indicator (FL, FR, RL, RR) with real-time threshold detection and animated fault alerts for low pressure (<29 PSI).
* **Interactive 3D Digital Twin:** Isometric EV x-ray viewport featuring dynamically anchored error callouts positioned directly over faulty vehicle components.
* **Gemini AI Diagnostic Agent:** Ingests active OBD-II error codes (e.g., C0035) and generates human-readable root-cause analysis and repair advice.
* **Fault-Tolerant Architecture:** Asynchronous state handling, error boundary fallbacks, and live network status indicators (`SYSTEM ONLINE`).

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Icons & UI Assets:** Lucide React, Custom SVG Data Visualization
* **AI Engine:** Google Gemini API (`@google/genai`)
* **Design System:** Cyber-Navy Dark Mode with Enterprise OEM Telemetry Styling

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** or **yarn**
* **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/))

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Divya-shr/Automotive-AI-cockpit.git](https://github.com/Divya-shr/Automotive-AI-cockpit.git)
   cd Automotive-AI-cockpit

  Setup & Run Frontend:

Bash
cd frontend
npm install
npm run dev
Setup & Run Backend:

Bash
cd ../backend
npm install
npm start
Configure Environment Variables:
Create a .env file inside your frontend/ directory:

Code snippet
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
📁 Project Architecture
Plaintext
Automotive-AI-cockpit/
├── frontend/                # React.js UI & Dashboard Components
│   ├── public/              # 3D Assets & Static Images
│   ├── src/                 # React Source Code
│   └── .env                 # API Keys (Ignored by git)
├── backend/                 # Telemetry API Services & Node.js Server
├── .gitignore               # Git Ignore Configuration
└── README.md                # Project Documentation
📄 License
Distributed under the MIT License. See LICENSE for details.
