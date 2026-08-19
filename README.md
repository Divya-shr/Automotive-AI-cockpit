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

#### 1. Clone the repository
```bash
git clone https://github.com/Divya-shr/Automotive-AI-cockpit.git
cd Automotive-AI-cockpit

2. Install Project Dependencies
Run the command below to install all required npm packages:

Bash
npm install
(Optional) If you are initializing from scratch:

Bash
npm install lucide-react @google/genai
npm install -D tailwindcss postcss autoprefixer
3. Configure Environment Variables
Create a .env file in the root directory of your project:

Bash
touch .env
Open the .env file and add your Gemini API key:

For Vite Projects (Vite default):

Code snippet
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
For Create React App Projects:

Code snippet
REACT_APP_GEMINI_API_KEY=your_actual_gemini_api_key_here
4. Verify Public Assets
Ensure the 3D EV schematic image (image_0.png) is placed inside the public/ directory so the UI can render the digital twin correctly:

Plaintext
Automotive-AI-cockpit/
└── public/
    └── image_0.png
5. Start the Local Development Server
Bash
npm run dev
# Or for Create React App:
# npm start
Open your browser and navigate to http://localhost:5173 (or http://localhost:3000).

🏗️ Production Build
To build the project for deployment:

Bash
npm run build
The optimized static assets will be generated in the dist/ (or build/) folder, ready to be deployed on platforms like Vercel, Netlify, or GitHub Pages.

📁 Project Architecture
Plaintext
Automotive-AI-cockpit/
├── public/
│   └── image_0.png          # 3D EV X-Ray Graphic Asset
├── src/
│   ├── components/
│   │   └── SDVDashboard.jsx # Main Dashboard & Telemetry Cockpit UI
│   ├── App.jsx              # Main Component & Gemini API Integration
│   ├── main.jsx             # React Application Entry Point
│   └── index.css            # Tailwind CSS Global Directive Setup
├── .env                     # Environment Variables (Ignored by git)
├── .gitignore               # Git Ignore Configuration
├── package.json             # NPM Dependencies & Scripts
├── tailwind.config.js       # Tailwind CSS Theme & Styling Config
└── README.md                # Project Documentation
📄 License
Distributed under the MIT License. See LICENSE for details.
