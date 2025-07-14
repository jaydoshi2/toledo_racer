"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import React from "react";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

interface ChartData {
  labels: (string | number)[];
  datasets: ChartDataset[];
}

// **********************************************************
// UPDATED DroneModel Interface
// **********************************************************
interface DroneModel {
  description: string;
  drone_details: {
    raceType: string;
    algorithm: string;
    flightAltitude: string;
    velocityLimit: string;
    yawLimit: string;
    action_space_type: string;
    reward_function: string;
    environment_simulation: string;
    framework: string;
    sensors: string;
    // Add an index signature if drone_details can have other dynamic keys
    [key: string]: string;
  };
  drone_id: string;
  id: number;
  status: string;
  title: string; // This will now serve as drone_name
  train_accuracy: number | null;
  train_loss: number | null;
  training_epochs: number;
  user_id: number;
  // NOTE: 'drone_name', 'race_type', 'action_space_type', 'environment_simulation',
  // 'action_space', 'reward_function', 'framework', 'sensors', 'algorithm',
  // 'hyperparameters' are now derived from 'title' and 'drone_details'
  // within the component, so they are removed from the top-level interface.
}

type SimulationStatus = 'idle' | 'initializing' | 'training' | 'success' | 'failed';

export default function ModelDetails({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = React.use(params);

  const [activeTab, setActiveTab] = useState("training");
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Loss",
        data: [],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Accuracy",
        data: [],
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  });

  const [modelDetails, setModelDetails] = useState<DroneModel | null>(null);
  const [gazeboStreamUrl, setGazeboStreamUrl] = useState<string>(`http://localhost:8000/gazebo-stream/${modelId}`);
  const [simulationStatus, setSimulationStatus] = useState<SimulationStatus>('idle');

  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
  const [lastMessage, setLastMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);


  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch model details
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("Username not found in localStorage");
      return;
    }

    // **********************************************************
    // UPDATED axios call and data processing
    // **********************************************************
    axios
      .get(`http://100.66.139.58:8000/users/${username}/drone-models/${modelId}`)
      .then((res) => {
        const fetchedData: DroneModel = res.data;
        console.log("Model details fetched:", fetchedData);
        setModelDetails(fetchedData); // Set the fetched data directly
      })
      .catch((err) => console.error("Error fetching model details:", err));
  }, [modelId]);

  // WebSocket for training updates
  useEffect(() => {
    const ws = new WebSocket("ws://100.66.139.58:8000/ws/train");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.done) return;

      setChartData((prev) => ({
        ...prev,
        labels: [...prev.labels, data.epoch],
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data, data.loss],
          },
          {
            ...prev.datasets[1],
            data: [...prev.datasets[1].data, data.accuracy],
          },
        ],
      }));
    };

    return () => {
      ws.close();
    };
  }, []);

  // WebSocket for drone control
  useEffect(() => {
    const socket = new WebSocket("ws://100.66.139.58:8000/ws/control");
    const username = localStorage.getItem("username"); // Re-fetch username for potential use in stream URL

    socket.onopen = () => setIsConnected(true);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from server:", data);

      setLastMessage(data.message || '');

      // Handle different message types
      if (data.type === 'simulation_status') {
        setSimulationStatus(data.status);

        // Set stream URL when simulation starts
        if (data.status === 'training') {
          setGazeboStreamUrl(`http://100.66.139.58:8000/gazebo-stream/${modelId}?username=${username}`);
        } else if (data.status === 'idle') {
          setGazeboStreamUrl(null);
        }
      } else if (data.type === 'command_sent') {
        // Handle command confirmation
        console.log(`Command confirmed: ${data.command}`);
      }
    };
    socket.onclose = () => {
      setIsConnected(false);
      setConnectionStatus('Disconnected');
      console.log("Control WebSocket closed");
    };
    socket.onerror = (error) => console.error("WebSocket error:", error);

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [modelId]); // Added username to dependency array if used in stream URL construction


// Start simulation when the page loads
useEffect(() => {
  const initializeSimulation = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("Username not found in localStorage");
      return;
    }

    setSimulationStatus("initializing"); // Set status to initializing

    try {
      const response = await axios.post(
        `http://100.66.139.58:8000/users/${username}/drone-models/${modelId}/start-simulation`
      );

      const result = response.data;
      if (result.status === "success" || result.status === "already_running") {
        setSimulationStatus("success");
        setLastMessage(result.message);
        setGazeboStreamUrl(`http://100.66.139.58:8000/gazebo-stream/${modelId}?username=${username}`);
      } else {
        setSimulationStatus("failed");
        setLastMessage(result.message);
      }
    } catch (error: any) {
      console.error("Error initializing simulation:", error);
      setSimulationStatus("failed");
      setLastMessage("Failed to initialize simulation.");
    }
  };

  initializeSimulation();
}, [modelId]);
  

  const sendCommand = (command: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(command);
      console.log(`Sent command: ${command}`);
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#003E7E] text-white p-4 flex items-center">
        <Link href="#" className="flex items-center gap-2 text-white hover:underline">
          <span className="font-bold">AWS DeepRacer</span>
        </Link>
        <div className="mx-2">{">"}</div>
        <Link href="/your_models" className="text-white hover:underline">
          Your models
        </Link>
        <div className="mx-2">{">"}</div>
        {/* ********************************************************** */}
        {/* Using modelDetails.title for the model name in header */}
        {/* ********************************************************** */}
        <span>{modelDetails?.title || modelId || "Loading..."}</span>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          {/* ********************************************************** */}
          {/* Using modelDetails.title for the model name in heading */}
          {/* ********************************************************** */}
          <h1 className="text-2xl font-bold">{modelDetails?.title || "Loading..."}</h1>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Actions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Clone model</DropdownMenuItem>
                <DropdownMenuItem>Download model</DropdownMenuItem>
                <DropdownMenuItem>Delete model</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-[#ffd200] hover:bg-[#ec8c04] text-black">Submit to virtual race</Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Evaluate and compare your model's performance with new evaluation capabilities.</strong>
            <br />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="training">Training</TabsTrigger> {/* Corrected value to 'training' */}
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-6">
            {/* Live Training Graph */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  {/* Graph section */}
                  <div className="flex-1">
                    <div className="h-64 w-full">
                      <Line
                        data={chartData}
                        options={{
                          responsive: true,
                          scales: {
                            x: { title: { display: true, text: "Epoch" } },
                            y: { title: { display: true, text: "Value" }, beginAtZero: true },
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Simulation video stream */}
                  <div className="flex-1">
                    {/* Display video stream if available, otherwise the placeholder */}
                    {gazeboStreamUrl ? (
                      <div className="h-64 w-full bg-black flex items-center justify-center rounded-lg overflow-hidden">
                        <iframe
                          src={gazeboStreamUrl}
                          title="Gazebo Stream"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="bg-gray-100 rounded-lg p-8 text-center h-64 flex flex-col items-center justify-center">
                        <div className="text-gray-400 mb-4">
                          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 14.846 4.632 16 6.414 16H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Simulation video stream not available.</strong>
                          <br />
                          Video is only available during training.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Drone Control */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Drone Control Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-x-2 mb-4">
                  <Button onClick={() => sendCommand("takeoff")} className="bg-yellow-500 text-white">Takeoff</Button>
                  <Button onClick={() => sendCommand("move_forward")} className="bg-blue-500 text-white">Move Forward</Button>
                  <Button onClick={() => sendCommand("land")} className="bg-blue-500 text-white">Land</Button>
                  <Button onClick={() => sendCommand("move_backward")} className="bg-blue-500 text-white">Move Backward</Button>
                  <Button onClick={() => sendCommand("turn_left")} className="bg-green-500 text-white">Turn Left</Button>
                  <Button onClick={() => sendCommand("turn_right")} className="bg-green-500 text-white">Turn Right</Button>
                </div>
                <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
                {lastMessage && <p>Last Message: {lastMessage}</p>} {/* Display last message */}

{simulationStatus === 'initializing' && (
  <p className="text-yellow-600 font-medium">Initializing simulation...</p>
)}

{simulationStatus === 'success' && (
  <p className="text-green-600 font-medium">Simulation initialized successfully ✅</p>
)}

{simulationStatus === 'failed' && (
  <p className="text-red-600 font-medium">Failed to initialize simulation ❌</p>
)}
                {/* <Button onClick={stopSimulation} className="bg-red-600 text-white">Stop Simulation</Button> */}
              </CardContent>
            </Card>

            {/* Model Details */}
            {modelDetails && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Model Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* ********************************************************** */}
                  {/* Displaying core model details from the root level of `modelDetails` */}
                  {/* ********************************************************** */}
                   
                 <p className="mb-2"><strong>Model ID:</strong> {modelDetails.id}</p>
                  <p className="mb-2"><strong>Drone ID:</strong> {modelDetails.drone_id}</p>
                  <p className="mb-2"><strong>Status:</strong> {modelDetails.status}</p>
                  <p className="mb-2"><strong>Description:</strong> {modelDetails.description}</p>
                  <p className="mb-2"><strong>Training Epochs:</strong> {modelDetails.training_epochs}</p>
                  <p className="mb-2"><strong>Train Accuracy:</strong> {modelDetails.train_accuracy !== null ? modelDetails.train_accuracy : "N/A"}</p>
                  <p className="mb-2"><strong>Train Loss:</strong> {modelDetails.train_loss !== null ? modelDetails.train_loss : "N/A"}</p>
                  <p className="mb-2"><strong>User ID:</strong> {modelDetails.user_id}</p>

                  <h4 className="font-medium mt-4 mb-2">Hyperparameters (from Drone Details)</h4>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Hyperparameter</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* ********************************************************** */}
                        {/* Iterating over modelDetails.drone_details for hyperparameters */}
                        {/* ********************************************************** */}
                        {modelDetails.drone_details && Object.entries(modelDetails.drone_details).map(([key, value], index) => (
                          <TableRow key={index}>
                            <TableCell className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell> {/* Capitalize and add spaces */}
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
                        {!modelDetails.drone_details && (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center text-gray-500">
                              No drone details or hyperparameters found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">Evaluation content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
