"use client"

import { useEffect, useState } from "react"

export default function GazeboStreamTestPage() {
  const [modelId, setModelId] = useState("078a7677-4cea-4dfd-94d4-d2f02d935fd0")
  const [username, setUsername] = useState("test_user") // Default username
  const [streamAvailable, setStreamAvailable] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSimulationRunning, setIsSimulationRunning] = useState(false)

  // Backend base URL (adjust to match your setup)
  const BASE_URL = "http://localhost:8000" // Change to "http://100.66.139.58:8000" if deployed

  // Check stream availability
  useEffect(() => {
    const checkStream = async () => {
      try {
        const res = await fetch(`${BASE_URL}/gazebo-stream/${modelId}?username=${username}`, {
          method: "GET",
          headers: {
            "Accept": "multipart/x-mixed-replace",
          },
        })
        if (res.ok) {
          setStreamAvailable(true)
          setErrorMessage("")
        } else {
          setStreamAvailable(false)
          setErrorMessage(`Stream unavailable: ${res.status} ${res.statusText}`)
        }
      } catch (err) {
        console.error("Stream check failed:", err)
        setStreamAvailable(false)
        setErrorMessage("Stream not available. Ensure Gazebo and backend are running.")
      }
    }

    checkStream()
    const interval = setInterval(checkStream, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [modelId, username])

  // Start simulation
  const startSimulation = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${username}/drone-models/${modelId}/start-simulation`, {
        method: "POST",
      })
      const data = await res.json()
      if (data.status === "success") {
        setIsSimulationRunning(true)
        setErrorMessage("")
      } else {
        setErrorMessage(data.message || "Failed to start simulation")
      }
    } catch (err) {
      console.error("Start simulation failed:", err)
      setErrorMessage("Error starting simulation. Check backend logs.")
    }
  }

  // Stop simulation
  const stopSimulation = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${username}/drone-models/${modelId}/stop-simulation`, {
        method: "POST",
      })
      const data = await res.json()
      if (data.status === "success") {
        setIsSimulationRunning(false)
        setStreamAvailable(false)
        setErrorMessage("")
      } else {
        setErrorMessage(data.message || "Failed to stop simulation")
      }
    } catch (err) {
      console.error("Stop simulation failed:", err)
      setErrorMessage("Error stopping simulation. Check backend logs.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Gazebo Live Stream Test</h1>

      <div className="mb-6 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter username"
        />
      </div>

      <div className="mb-6 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">Model ID</label>
        <input
          type="text"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter model ID"
        />
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={startSimulation}
          disabled={isSimulationRunning}
          className={`px-4 py-2 rounded text-white ${
            isSimulationRunning ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Start Simulation
        </button>
        <button
          onClick={stopSimulation}
          disabled={!isSimulationRunning}
          className={`px-4 py-2 rounded text-white ${
            !isSimulationRunning ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Stop Simulation
        </button>
      </div>

      {streamAvailable ? (
        <div className="w-full max-w-4xl border rounded shadow overflow-hidden">
          <img
            src={`${BASE_URL}/gazebo-stream/${modelId}?username=${username}`}
            alt="Gazebo Stream"
            className="w-full"
            onError={() => {
              setStreamAvailable(false)
              setErrorMessage("Stream failed to load. Check backend or simulation status.")
            }}
          />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-600 text-sm mb-4">{errorMessage || "Stream is not available. Start the simulation and ensure the backend is running."}</p>
          <img
            src="/placeholder.png" // Add a placeholder image in your public folder
            alt="No Stream Available"
            className="w-64 h-48 object-cover border rounded"
          />
        </div>
      )}
    </div>
  )
}
