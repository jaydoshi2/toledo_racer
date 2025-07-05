"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useStepWizard } from "../layout"

export default function Step2() {
  const [raceType, setRaceType] = useState<string>("time-trial")
  const [algorithm, setAlgorithm] = useState<string>("ppo")
  const [flightAltitude, setFlightAltitude] = useState<string>("")
  const [velocityLimit, setVelocityLimit] = useState<string>("")
  const [yawLimit, setYawLimit] = useState<string>("")
  const [enableWind, setEnableWind] = useState<string>("false")
  const [windSpeed, setWindSpeed] = useState<string>("")

  const { setStepCompletion, setStepData } = useStepWizard()

  // Load stored values on mount
  useEffect(() => {
    const storedData = localStorage.getItem("droneDetails")
    if (storedData) {
      const details = JSON.parse(storedData)
      if (details.raceType) setRaceType(details.raceType)
      if (details.algorithm) setAlgorithm(details.algorithm)
      if (details.flightAltitude) setFlightAltitude(details.flightAltitude)
      if (details.velocityLimit) setVelocityLimit(details.velocityLimit)
      if (details.yawLimit) setYawLimit(details.yawLimit)
      if (details.enableWind) setEnableWind(details.enableWind)
      if (details.windSpeed) setWindSpeed(details.windSpeed)
    }
  }, [])

  const handleNext = () => {
    const details = {
      raceType,
      algorithm,
      flightAltitude,
      velocityLimit,
      yawLimit,
      enableWind,
      windSpeed,
    }
    localStorage.setItem("droneDetails", JSON.stringify(details))
    setStepData(2, details)
    setStepCompletion(2, true)
    window.location.href = "/create_model/step3"
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Step 2: Drone Configuration</h1>

      {/* Race Type Section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Race Type</CardTitle>
          <div className="border-t mt-1" />
        </CardHeader>
        <CardContent>
          <RadioGroup value={raceType} onValueChange={setRaceType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`border rounded-md p-4 relative cursor-pointer transition-colors ${
                raceType === "time-trial" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setRaceType("time-trial")}
            >
              <div className="flex items-start mb-4">
                <RadioGroupItem value="time-trial" id="time-trial" className="mt-1" />
                <div className="ml-2">
                  <Label htmlFor="time-trial" className="font-medium cursor-pointer">
                    Time Trial
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">
                    The vehicle races alone to achieve the fastest possible time on the track.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=150"
                  alt="Time trial illustration"
                  width={150}
                  height={100}
                  className="opacity-70"
                />
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Training Algorithm Section */}
      <Card className="mb-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Training Algorithm</CardTitle>
          <span className="text-xs text-blue-600 cursor-pointer">Info</span>
        </CardHeader>
        <div className="border-t mx-4 mb-2" />
        <CardContent>
          <RadioGroup value={algorithm} onValueChange={setAlgorithm} className="space-y-4">
            <div
              className={`flex items-start space-x-2 p-3 border rounded-md cursor-pointer transition-colors ${
                algorithm === "ppo" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setAlgorithm("ppo")}
            >
              <RadioGroupItem value="ppo" id="ppo" className="mt-1" />
              <div>
                <Label htmlFor="ppo" className="font-medium cursor-pointer">
                  PPO
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  A state-of-the-art policy gradient algorithm using policy and value networks for training.
                </p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-2 p-3 border rounded-md cursor-pointer transition-colors ${
                algorithm === "sac" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setAlgorithm("sac")}
            >
              <RadioGroupItem value="sac" id="sac" className="mt-1" />
              <div>
                <Label htmlFor="sac" className="font-medium cursor-pointer">
                  SAC
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  An exploration-driven algorithm that incentivizes entropy to discover optimal policies.
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Hyperparameters Section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Hyperparameters</CardTitle>
          <div className="border-t mt-2" />
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <div>
            <label className="font-semibold">Flight Altitude</label>
            <p>Specifies the altitude (in meters) at which the drone is expected to fly.</p>
            <input
              type="number"
              className="mt-1 p-2 border rounded w-full"
              placeholder="e.g., 100"
              value={flightAltitude}
              onChange={(e) => setFlightAltitude(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Velocity Limit</label>
            <p>Maximum allowed speed (in m/s) for the drone during flight.</p>
            <input
              type="number"
              className="mt-1 p-2 border rounded w-full"
              placeholder="e.g., 15"
              value={velocityLimit}
              onChange={(e) => setVelocityLimit(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Yaw Limit</label>
            <p>Maximum rotational angle (in degrees) allowed for drone yaw.</p>
            <input
              type="number"
              className="mt-1 p-2 border rounded w-full"
              placeholder="e.g., 45"
              value={yawLimit}
              onChange={(e) => setYawLimit(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Enable Wind</label>
            <p>Enables simulation of wind conditions affecting drone behavior.</p>
            <select
              className="mt-1 p-2 border rounded w-full"
              value={enableWind}
              onChange={(e) => setEnableWind(e.target.value)}
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Wind Speed</label>
            <p>Defines wind speed (in m/s) for the simulation if wind is enabled.</p>
            <input
              type="number"
              className="mt-1 p-2 border rounded w-full"
              placeholder="e.g., 5"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/create_model/step1">Previous</Link>
        </Button>
        <Button className="bg-[#ffd200] hover:bg-[#ec8c04] text-black" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
