"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export default function Step2() {
  const [raceType, setRaceType] = useState("time-trial")
  const [algorithm, setAlgorithm] = useState("ppo")
  const [isHyperparametersOpen, setIsHyperparametersOpen] = useState(false)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create model</h1>

      {/* Race type section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Race type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-4">Choose a race type</p>

            <RadioGroup value={raceType} onValueChange={setRaceType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Time trial */}
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
                      Time trial
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      The agent races against the clock on a well-marked track without stationary obstacles or moving
                      competitors.
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

              {/* Object avoidance */}
              <div
                className={`border rounded-md p-4 relative cursor-pointer transition-colors ${
                  raceType === "object-avoidance" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setRaceType("object-avoidance")}
              >
                <div className="flex items-start mb-4">
                  <RadioGroupItem value="object-avoidance" id="object-avoidance" className="mt-1" />
                  <div className="ml-2">
                    <Label htmlFor="object-avoidance" className="font-medium cursor-pointer">
                      Object avoidance
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      The vehicle races on a two-lane track with a fixed number of stationary obstacles placed along the
                      track.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=150"
                    alt="Object avoidance illustration"
                    width={150}
                    height={100}
                    className="opacity-70"
                  />
                </div>
              </div>

              {/* Head-to-head racing */}
              <div
                className={`border rounded-md p-4 relative cursor-pointer transition-colors ${
                  raceType === "head-to-head" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setRaceType("head-to-head")}
              >
                <div className="flex items-start mb-4">
                  <RadioGroupItem value="head-to-head" id="head-to-head" className="mt-1" />
                  <div className="ml-2">
                    <Label htmlFor="head-to-head" className="font-medium cursor-pointer">
                      Head-to-head racing
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      The vehicle races against other moving vehicles on a two-lane track.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=150"
                    alt="Head-to-head racing illustration"
                    width={150}
                    height={100}
                    className="opacity-70"
                  />
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Training algorithm section */}
      <Card className="mb-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Training algorithm and hyperparameters</CardTitle>
          <span className="text-xs text-blue-600 cursor-pointer">Info</span>
        </CardHeader>
        <CardContent>
          <RadioGroup value={algorithm} onValueChange={setAlgorithm} className="space-y-4">
            {/* PPO */}
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
                  A state-of-the-art policy gradient algorithm which uses two neural networks during training – a policy
                  network and a value network.
                </p>
              </div>
            </div>

            {/* SAC */}
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
                  Not limiting itself to seeking only the maximum of lifetime rewards, this algorithm embraces
                  exploration, incentivizing entropy in its pursuit of optimal policy.
                </p>
              </div>
            </div>
          </RadioGroup>

          {/* Hyperparameters collapsible section */}
          <Collapsible
            className="mt-4 border rounded-md"
            open={isHyperparametersOpen}
            onOpenChange={setIsHyperparametersOpen}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left">
              <span className="font-medium">Hyperparameters</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isHyperparametersOpen ? "transform rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 border-t">
              <p className="text-sm text-gray-600">
               <h4>Number of epochs</h4>
               <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10" id="10" />
                  <Label htmlFor="10">10</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="20" />
                  <Label htmlFor="20">20</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30" id="30" />
                  <Label htmlFor="30">30</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="40" id="40" />
                  <Label htmlFor="40">40</Label>
                </div>
               </RadioGroup>
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/create_model/step1">Previous</Link>
        </Button>
        <Button asChild className="bg-[#ff9900] hover:bg-[#ec8c04] text-black">
          <Link href="/create_model/step3">Next</Link>
        </Button>
      </div>
    </div>
  )
}
