"use client";

import { useEffect, useRef, useState } from "react";

export default function DroneControl() {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/control");

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log("Received from server:", event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current = socket;

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const sendCommand = (command: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(command);
      console.log(`Sent command: ${command}`);
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Drone Control Panel</h1>
      
      <div className="space-x-2">|
        <button
  onClick={() => sendCommand("takeoff")}
  className="px-4 py-2 bg-yellow-500 text-white rounded"
>
  Takeoff
</button>


        <button
          onClick={() => sendCommand("move_forward")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Move Forward
        </button>
        <button
          onClick={() => sendCommand("Land")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Land
        </button>
        <button
          onClick={() => sendCommand("move_backward")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Move Backward
        </button>
        <button
          onClick={() => sendCommand("turn_left")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Turn Left
        </button>
        <button
          onClick={() => sendCommand("turn_right")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Turn Right
        </button>
      </div>
      <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
    </div>
  );
}
