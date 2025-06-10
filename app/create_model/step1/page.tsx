"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useStepWizard } from "../layout"

export default function Step1() {
  const [selectedTrack, setSelectedTrack] = useState("track1")
  const [trackDirection, setTrackDirection] = useState("counterclockwise")
  const [modelName, setModelName] = useState("")
  const [description, setDescription] = useState("")
  const [touched, setTouched] = useState(false)
  const { setStepCompletion, setStepData } = useStepWizard()

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!modelName.trim() || !description.trim()) return
    setStepData(1, { modelName, description, selectedTrack, trackDirection })
    setStepCompletion(1, true)
    window.location.href = "/create_model/step2"
  }

  const isValid = modelName.trim() && description.trim()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Step 1: Specify the model name and environment</h1>

      {/* Overview section */}
      <Card className="mb-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Overview</CardTitle>
          <span className="text-xs text-blue-600 cursor-pointer">Info</span>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="mb-3">
                In reinforcement learning for AWS DeepRacer, an <strong>agent</strong> (vehicle) learns from an{" "}
                <strong>environment</strong> (a track) by interacting with it and receiving rewards for performing
                specific actions.
              </p>
              <p className="mb-3">
                The model training process will simulate multiple experiences of the vehicle on the track in an attempt
                to find a <strong>policy</strong> (a function mapping the agent's current state to a driving decision)
                which maximizes the average total reward the agent experiences.
              </p>
              <p>
                After training, you will be able to evaluate the model's performance in a new environment, deploy the
                model to a physical vehicle, or submit the model to a virtual race.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="border rounded p-4 bg-white">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Reinforcement learning diagram"
                  width={300}
                  height={200}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training details section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Training details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="model-name">Model name</Label>
            <Input id="model-name" placeholder="MyRacer or model name" className="mt-1" value={modelName} onChange={e => setModelName(e.target.value)} />
            <div className="text-xs text-gray-500 mt-1">
              The model name can have up to 64 characters. Valid characters: A-Z, a-z, 0-9, and hyphen (-). No spaces or underscores (_)
            </div>
            {touched && !modelName.trim() && <div className="text-xs text-red-500 mt-1">Model name is required.</div>}
          </div>
          <div>
            <Label htmlFor="training-description">Training job description</Label>
            <Textarea id="training-description" placeholder="Log details for quick reference" className="mt-1 h-24" value={description} onChange={e => setDescription(e.target.value)} />
            <div className="text-xs text-gray-500 mt-1">The model description can have up to 255 characters.</div>
            {touched && !description.trim() && <div className="text-xs text-red-500 mt-1">Description is required.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Environment simulation section */}
      <Card className="mb-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Environment simulation</CardTitle>
          <span className="text-xs text-blue-600 cursor-pointer">Info</span>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Simulated environment emulates a track to train your model.</p>

          <RadioGroup value={selectedTrack} onValueChange={setSelectedTrack} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Track 1 */}
              <div
                className={`border rounded-md p-4 relative cursor-pointer transition-colors ${
                  selectedTrack === "track1" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedTrack("track1")}
              >
                <div className="flex items-start mb-2">
                  <RadioGroupItem value="track1" id="track1" className="mt-1" />
                  <div className="ml-2">
                    <Label htmlFor="track1" className="font-medium cursor-pointer">
                      Fastest Raceway
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      The Fastest Raceway is the grand finale of the DeepRacer Championship Series. Inspired by the Indy
                      500, this oval-shaped track features short, narrow straightaways and tight turns that test the
                      skill and speed of your vehicle. Bring all your skills to this race, as it is the last and most
                      important race of the ultimate AWS DeepRacer Championship.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">Direction: Counterclockwise</div>
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt="Fastest Raceway track"
                    width={200}
                    height={100}
                    className="w-full"
                  />
                </div>
                <Button variant="secondary" size="sm" className="mt-2 bg-blue-600 text-white hover:bg-blue-700">
                  Virtual race
                </Button>
              </div>

              {/* Track 2 */}
              <div
                className={`border rounded-md p-4 relative cursor-pointer transition-colors ${
                  selectedTrack === "track2" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedTrack("track2")}
              >
                <div className="flex items-start mb-2">
                  <RadioGroupItem value="track2" id="track2" className="mt-1" />
                  <div className="ml-2">
                    <Label htmlFor="track2" className="font-medium cursor-pointer">
                      2022 reinvent Championship
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      This track was used to determine the official 2022 reinvent Championship. This international
                      official track (15.97 m) features a technical section with hairpin turns that challenge even the
                      most skilled developers.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">Direction: Counterclockwise</div>
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt="2022 reinvent Championship track"
                    width={200}
                    height={100}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Track 3 */}
              <div
                className={`border rounded-md p-4 relative cursor-pointer transition-colors ${
                  selectedTrack === "track3" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedTrack("track3")}
              >
                <div className="flex items-start mb-2">
                  <RadioGroupItem value="track3" id="track3" className="mt-1" />
                  <div className="ml-2">
                    <Label htmlFor="track3" className="font-medium cursor-pointer">
                      Jocques Super Speedway
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      This 62.07 m track is named in honor of the two best racing family and friends in the world,
                      "Jocques" and "Timothy Takawira". These two friends have always needed to manage the technical
                      turns while maintaining super high speeds on this drag strip to claim the championship.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">Direction: Clockwise, Counterclockwise</div>
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt="Jocques Super Speedway track"
                    width={200}
                    height={100}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </RadioGroup>

          <div className="mb-4">
            <Link href="#" className="text-blue-600 text-sm hover:underline">
              View more race tracks
            </Link>
          </div>

          <div className="mb-4">
            <div className="font-medium mb-2">Track direction</div>
            <div className="text-sm text-gray-600 mb-2">Select the direction in which you want to race.</div>
            <RadioGroup value={trackDirection} onValueChange={setTrackDirection} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="counterclockwise" id="counterclockwise" />
                <Label htmlFor="counterclockwise">Counterclockwise</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clockwise" id="clockwise" />
                <Label htmlFor="clockwise">Clockwise</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Tags section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <span>Tags - </span>
            <span className="text-gray-500 font-normal ml-1">optional</span>
          </CardTitle>
        </CardHeader>
        <CardContent>{/* Tags content would go here */}</CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <Button className="bg-[#ff9900] hover:bg-[#ec8c04] text-black" onClick={handleNext} disabled={!isValid}>
          Next
        </Button>
      </div>
    </div>
  )
}
