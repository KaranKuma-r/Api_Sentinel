<!-- ===================== HEADER ===================== -->
<div align="center">
  <h1>🛡️ API Sentinel</h1>
  <p><b>AI-powered API Monitoring & Observability Platform for modern applications</b></p>

  <img src="https://img.shields.io/badge/MERN-Stack-green" />
  <img src="https://img.shields.io/badge/AI-Enabled-purple" />
  <img src="https://img.shields.io/badge/Status-Active-success" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</div>

---

## 🚀 Overview

API Sentinel is a **full-stack API monitoring and observability platform** that helps developers track API performance, detect failures, and analyze root causes using **AI-powered insights**.

It consists of:
- A lightweight SDK for instrumentation  
- A scalable backend for telemetry ingestion  
- A real-time frontend dashboard for visualization  

---

## ✨ Key Features

- ⚡ Real-time monitoring of API latency, request count, and error rates  
- 🤖 AI-based root cause analysis using OpenAI & Gemini  
- 🧰 Lightweight SDK for Express.js integration  
- 📊 Interactive dashboard with charts and real-time metrics  
- 🔐 Secure authentication using JWT  

---

## 🏗️ Architecture

| Layer | Description | Tech Stack |
|------|------------|-----------|
| 🧰 SDK | Captures API metrics and sends telemetry | Node.js, Axios |
| ⚙️ Backend | Handles ingestion, storage, and AI analysis | Express.js, MongoDB, Mongoose, OpenAI, Gemini |
| 🖥️ Frontend | Visual dashboard for monitoring | React, Vite, Tailwind, Recharts, Three.js |

---

## 🔌 SDK (api-sentinel-monitor)

API Sentinel provides a lightweight SDK to integrate monitoring into any Express application.

### Features:
- Captures request/response lifecycle  
- Tracks latency, errors, and request metrics  
- Sends telemetry data to backend in real time  
- Easy middleware-based integration  

### Example Usage:

```javascript
const express = require("express");
const sentinel = require("api-sentinel-monitor");

const app = express();

app.use(
  sentinel.express({
    agentKey: "your_secure_agent_key",
    serviceName: "my-service"
  })
);

app.get("/", (req, res) => {
  res.send("API monitored successfully!");
});

app.listen(3000);
