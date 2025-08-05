import { useEffect, useState } from "react";
import { socket } from "./services/socket";
import CanvasBoard from "./components/CanvasBoard";

const Home = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    socket.on("user:count", (count) => {
      setUserCount(count);  
    });

    return () => {
      socket.off("user:count");
    }; 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 p-4">
      <div className="mb-4 px-6 py-3 rounded-xl shadow-md bg-white text-gray-800 text-xl font-bold tracking-wide flex items-center gap-2">
        <span className="text-green-500 text-2xl">●</span>
        <span>Active Users: {userCount}</span>
      </div>

      <div className="h-[90vh] w-[80vw] rounded-2xl border border-rose-200 bg-white overflow-hidden shadow-lg p-6">
        <CanvasBoard />
      </div>
    </div>
  );
};

export default Home;
