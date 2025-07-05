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

interface DroneModel {
  drone_name: string;
  status: string;
  race_type: string;
  action_space_type: string;
  environment_simulation: string;
  action_space: string;
  reward_function: string;
  framework: string;
  sensors: string;
  algorithm: string;
  hyperparameters: { [key: string]: string };
}

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
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch model details
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("Username not found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:models8000/users/${username}/drone-models/${modelId}`)
      .then((res) => setModelDetails(res.data))
      .catch((err) => console.error(err));
  }, [modelId]);

  // WebSocket for training updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/train");

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

  // WebSocket for drone contromodelsl
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/control");

    socket.onopen = () => setIsConnected(true);
    socket.onmessage = (event) => console.log("Received from server:", event.data);
    socket.onclose = () => setIsConnected(false);
    socket.onerror = (error) => console.error("WebSocket error:", error);

    socketRef.current = socket;

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
        <span>{modelDetails?.drone_name || modelId || "Loading..."}</span>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{modelDetails?.drone_name || "Loading..."}</h1>
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
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="tmodelsraining">Training</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-6">
            {/* Live Training Graph */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
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
                  />models
                </div>
              </CardContent>
            </Card>

            {/* Simulation video stream */}
            <div>
              <h3 className="font-medium mb-4">Simulation video stream</h3>
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
            </div>

            {/* Drone Control */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Drone Control Panel</CardTitle>
              </CardHeader>models
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
              </CardContent>
            </Card>

            {/* Model Details */}
            {modelDetails && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Model Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2"><strong>Race Type:</strong> {modelDetails.race_type}</p>
                  <p className="mb-2"><strong>Action Space Type:</strong> {modelDetails.action_space_type}</p>
                  <p className="mb-2"><strong>Environment Simulation:</strong> {modelDetails.environment_simulation}</p>
                  <p className="mb-models2"><strong>Action Space:</strong> {modelDetails.action_space}</p>
                  <p className="mb-2"><strong>Reward Function:</strong> {modelDetails.reward_function}</p>
                  <p className="mb-2"><strong>Framework:</strong> {modelDetails.framework}</p>
                  <p className="mb-2"><strong>Sensors:</strong> {modelDetails.sensors}</p>
                  <p className="mb-2"><strong>Algorithm:</strong> {modelDetails.algorithm}</p>

                  <h4 className="font-medium mt-4 mb-2">Hyperparameters</h4>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Hyperparameter</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(modelDetails.hyperparameters).map(([key, value], index) => (
                          <TableRow key={index}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))}
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
