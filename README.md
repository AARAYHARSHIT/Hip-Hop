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

## 💻 How to Run Locally

To experience the full platform, you must run both the frontend UI and the backend data receiver.

### 1. Start the Backend Server
Open a terminal and navigate to the backend directory:
```bash
cd hip-hop-backend
npm install
node server.js

