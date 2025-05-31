"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, RefreshCw, Info } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"

// Mock data for the reward graph
const rewardData = [
  { iteration: 0, avgReward: 0, avgCompletion: 0, bestLapTime: 0 },
  { iteration: 2, avgReward: 50, avgCompletion: 20, bestLapTime: 15 },
  { iteration: 4, avgReward: 120, avgCompletion: 45, bestLapTime: 25 },
  { iteration: 6, avgReward: 180, avgCompletion: 65, bestLapTime: 35 },
  { iteration: 8, avgReward: 220, avgCompletion: 80, bestLapTime: 45 },
  { iteration: 10, avgReward: 280, avgCompletion: 95, bestLapTime: 50 },
]

const hyperparameters = [
  { parameter: "Gradient descent batch size", value: "64" },
  { parameter: "Entropy", value: "0.01" },
  { parameter: "Discount factor", value: "0.99" },
  { parameter: "Loss type", value: "Huber" },
  { parameter: "Learning rate", value: "0.0003" },
  { parameter: "Number of experience episodes between each policy-updating iteration", value: "20" },
  { parameter: "Number of epochs", value: "10" },
]

export default function ModelDetails({ params }: { params: { modelId: string } }) {
  const [activeTab, setActiveTab] = useState("training")

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#232f3e] text-white p-4 flex items-center">
        <Link href="#" className="flex items-center gap-2 text-white hover:underline">
          <span className="font-bold">AWS DeepRacer</span>
        </Link>
        <div className="mx-2">{">"}</div>
        <Link href="/your_models" className="text-white hover:underline">
          Your models
        </Link>
        <div className="mx-2">{">"}</div>
        <span>second</span>
      </header>

      <div className="p-6">
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">second</h1>
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
            <Button className="bg-[#ff9900] hover:bg-[#ec8c04] text-black">Submit to virtual race</Button>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Evaluate and compare your model's performance with new evaluation capabilities.</strong>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-6">
            {/* Training section */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <span>▼</span> Training <span className="text-sm text-gray-500">Info</span>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Download logs
                    </Button>
                    <Button variant="outline" size="sm">
                      Stop training
                    </Button>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      ● Completed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-6">
                  AWS DeepRacer leverages Amazon SageMaker to train your model behind the scenes and uses AWS RoboMaker
                  to simulate the agent's interaction with the environment. Watch how the agent behaves in the
                  environment.{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Watch how
                  </Link>
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Reward graph */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-medium">Reward graph</h3>
                      <span className="text-sm text-gray-500">Info</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={rewardData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="iteration" />
                          <YAxis />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="avgReward"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Average reward (Training)"
                          />
                          <Line
                            type="monotone"
                            dataKey="avgCompletion"
                            stroke="#22c55e"
                            strokeWidth={2}
                            name="Average percentage completion (Training)"
                          />
                          <Line
                            type="monotone"
                            dataKey="bestLapTime"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Average percentage completion (Evaluation)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

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
                </div>

                {/* Stop condition */}
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Stop condition</h3>
                  <p className="text-sm text-gray-600">01:00:00 / 01:00:00</p>
                </div>
              </CardContent>
            </Card>

            {/* Training configuration */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Training configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Race type */}
                  <div>
                    <h4 className="font-medium mb-2">Race type</h4>
                    <p className="text-sm text-gray-600">Time trial</p>
                  </div>

                  {/* Action space type */}
                  <div>
                    <h4 className="font-medium mb-2">Action space type</h4>
                    <p className="text-sm text-gray-600">Continuous</p>
                  </div>

                  {/* Environment simulation */}
                  <div>
                    <h4 className="font-medium mb-2">Environment simulation</h4>
                    <p className="text-sm text-gray-600">Fastest Raceway - Counterclockwise</p>
                  </div>

                  {/* Action space */}
                  <div>
                    <h4 className="font-medium mb-2">Action space</h4>
                    <p className="text-sm text-gray-600">
                      Speed: [ 0.5 - 1 ] m/s
                      <br />
                      Steering angle: [ -30 - 30 ] °
                    </p>
                  </div>

                  {/* Reward function */}
                  <div>
                    <h4 className="font-medium mb-2">Reward function</h4>
                    <Button variant="outline" size="sm">
                      Show
                    </Button>
                  </div>

                  {/* Framework */}
                  <div>
                    <h4 className="font-medium mb-2">Framework</h4>
                    <p className="text-sm text-gray-600">TensorFlow</p>
                  </div>

                  {/* Sensor(s) */}
                  <div>
                    <h4 className="font-medium mb-2">Sensor(s)</h4>
                    <p className="text-sm text-gray-600">Camera</p>
                  </div>

                  {/* Reinforcement learning algorithm */}
                  <div>
                    <h4 className="font-medium mb-2">Reinforcement learning algorithm</h4>
                    <p className="text-sm text-gray-600">PPO</p>
                  </div>
                </div>

                {/* Hyperparameters table */}
                <div className="mt-6">
                  <h4 className="font-medium mb-4">Hyperparameter</h4>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Hyperparameter</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hyperparameters.map((param, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{param.parameter}</TableCell>
                            <TableCell>{param.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
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
  )
}
