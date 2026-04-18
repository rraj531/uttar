# Uttar AI Wellness (Pramana)

**Uttar AI Wellness** (also known as the Pramana platform) is a full-stack, AI-driven psychological support and wellness tracking platform. It is designed around the "Digital Sanctuary" philosophy, prioritizing emotional and psychological health through a serene, high-end editorial experience that feels fluid, organic, and safe.

## ✨ Key Features
- **AI-Powered Wellness Insights:** Leverages Google Gemini AI to provide personalized psychological and wellness support.
- **Mood & Wellness Tracking:** Interactive features to track mental health progress and emotional milestones.
- **Exportable Reports:** Users can generate PDF wellness reports of their progress.
- **Firebase Authentication & Firestore:** Secure user management and data persistence.
- **Intentional "Sanctuary" Design:** A UI approach rooted in soft minimalism, tonal transitions, and glassmorphism, acting as a deep breath for the user rather than just a clinical dashboard.

## 🛠️ Tech Stack

**Frontend:**
- React 19 (via Vite)
- Tailwind CSS 4.x
- Lucide React (for icons)
- jsPDF (for reliable PDF exports)
- Axios & date-fns

**Backend:**
- Node.js & Express 5.x
- MongoDB (via Mongoose)
- `@google/genai` (Google Gemini integration)
- JSON Web Tokens / Firebase (Auth)
- dotenv & cors

## 🎨 Design Philosophy
The UI follows the "Creative North Star" of **The Serene Sanctuary**, incorporating:
- **Soft Minimalism & Intentional Asymmetry:** Generous white space preventing the typical SaaS rigid grid.
- **No-Line Rule:** Relying purely on background color shifts and tones rather than 1px harsh borders.
- **Tonal Layering & Depth:** Ambient shadow and overlapping elements to build physical presence for elements without harshness.

## 🚀 How to Run Locally

You will need two separate terminal windows to run both the frontend client and the backend server.

### 1. Start the Backend Server (Terminal 1)
```bash
cd server
npm install

# Make sure you establish a .env file containing the required variables 
# e.g., MongoDB URI, Gemini API Key, Port, etc.

npm start
```
*The server will typically start on `http://localhost:5000` or the port defined in your `.env`.*

### 2. Start the Frontend Client (Terminal 2)
```bash
cd client
npm install

# Start the Vite development environment
npm run dev
```
*The client will usually be accessible at `http://localhost:5173`.*

## 🔒 Environment Variables
Make sure to configure the correct `.env` files in your respective root directories (`server/.env`). These should include:
- `GEMINI_API_KEY`: Your Google Gemini API Key.
- `MONGO_URI`: The MongoDB connection string.
- (Plus any other authentication or Firebase configuration values standard to your environment).

## 🚀 Deployment
This application maintains production builds configured for seamless deployment:
- **Frontend** is typically deployed via Vercel (`vercel.json` included).
- **Backend** is configured to run smoothly on platforms like Render or Heroku.
