🖌️ Real-Time Collaborative Canvas App
This app allows multiple users to draw together in real-time on a shared canvas. It also shows the number of active users currently connected.

🔧 Tech Stack
Frontend: React + Tailwind CSS

Realtime Communication: Socket.IO

State Management: Zustand

Backend: Node.js + Express + Socket.IO

🚀 Features
🎨 Collaborative canvas with real-time drawing

👥 Displays live user count (active users online)

📦 Clean and scalable project structure

⚡ Lightweight and fast communication using sockets

📂 Project Structure
pgsql
Copy
Edit
📁 client/
  ┣ 📁 components/
  ┃ ┗ 📄 CanvasBoard.tsx
  ┣ 📁 services/
  ┃ ┗ 📄 socket.ts
  ┣ 📄 Home.tsx
📁 server/
  ┣ 📄 index.ts
  ┣ 📄 routes.ts
🔄 Real-Time Logic
When a user joins or leaves, the server emits user:count

Clients listen for user:count using Socket.IO and update the count

Drawings on canvas are broadcasted to all connected clients instantly

📸 UI Preview
jsx
Copy
Edit
🟢 Active Users: 3
+ Clean UI with Tailwind CSS
+ Icon-enhanced header (👥 🎨 ⚡)
+ Responsive and mobile-friendly layout
✅ How to Run
Start Backend

arduino
Copy
Edit
cd server
npm install
npm run dev
Start Frontend

arduino
Copy
Edit
cd client
npm install
npm run dev

<img src="./shot" />
