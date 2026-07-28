# KR$NA // YOURS TRULY - 3D Interactive Portfolio

![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

A premium, brutalist 3D interactive web experience designed as a concept portfolio for Desi Hip-Hop artist KR$NA. This project bridges the gap between high-end digital design and underground street culture, featuring scroll-bound WebGL physics, dynamic 3D asset mapping, and e-commerce infrastructure.

Built for the **Techfest Submission / Web Development Showcase**.

---

## 🚀 Current Status & Features

The application is currently operating as a decoupled frontend with a local simulated backend endpoint. 

*   **Cinematic WebGL Physics:** Custom 3D vinyl record component that tracks mouse inertia and executes a scroll-triggered "sleeve reveal" animation.
*   **Dynamic Texture Swapping:** Album cover textures physically map and remap onto the 3D vinyl mesh in real-time as users interact with the discography UI.
*   **Immersive Environment:** A highly optimized 60fps 3D particle dust system using `InstancedMesh` alongside a custom inverse-blended navigation cursor.
*   **Parallax Glassmorphism UI:** UI cards that calculate mouse coordinates to tilt in 3D space with dynamic, moving light glare.
*   **Commerce Hooks (API Ready):** Fully functional React state-driven modal system that captures user checkout data and fires `POST` requests to a local Express.js server.

---

## 🛠️ Tech Stack

**Frontend Architecture:**
*   React.js (Vite Build Engine)
*   Tailwind CSS (Custom Brutalist Theme Configuration)
*   React Three Fiber (R3F) & Three.js
*   @react-three/drei (Environment & Helpers)
*   Lucide React (Iconography)

**Backend Architecture (Current):**
*   Node.js
*   Express.js (REST API Routing)
*   CORS

---

# KR$NA Hip-Hop Portfolio & Merch Store

An interactive 3D web experience and merchandise pre-order platform. The project is split into a **Vite/React Frontend** and a **Node.js/Express Backend**.

---

## 📁 Folder Structure

It is crucial to run commands in the correct directories. The frontend lives in the root folder, and the backend is isolated in its own subfolder.

```text
HIP-HOP/ (Root Directory)
├── src/                    # Frontend React/Three.js source code
├── public/                 # Static assets
├── index.html              # Vite entry point
├── package.json            # Frontend dependencies
├── vite.config.ts          # Vite configuration
│
└── hip-hop-backend/        # ⚙️ BACKEND DIRECTORY
    ├── models/             # Database schemas (Currently unused)
    ├── package.json        # Backend dependencies
    └── server.js           # Express server and API routes

```
---
🚀 Running the Project Locally
To run this project, you will need to open two separate terminal windows—one for the frontend and one for the backend.

1. Start the Backend API (Terminal 1)
The backend handles the /api/checkout route for the merch store. It runs on http://localhost:5000.

Open your first terminal and run:

# 1. Change into the backend directory
cd hip-hop-backend

# 2. Install dependencies (only needed the first time)
npm install

# 3. Start the Express server
node server.js

You should see: 🚀 Backend Server running on http://localhost:5000
---
2. Start the Frontend Application (Terminal 2)
The frontend is built with Vite and runs on http://localhost:5173.

Open a new, second terminal, ensure you are in the Root Directory (HIP-HOP/), and run:


# 1. Make sure you are in the root directory!
(If you are in the backend folder, type: cd ..)

 2. Install dependencies (only needed the first time)
# npm install

3. Start the Vite development server
# npm run dev
Click the http://localhost:5173 link in the terminal to open the site in your browser.

🛠️ Current Development State
Database: MongoDB has currently been bypassed. The backend uses a mock checkout route that successfully captures frontend form data and logs it to the terminal without requiring a database connection.

API Routing: Frontend POST requests are routed perfectly to the Express server.

