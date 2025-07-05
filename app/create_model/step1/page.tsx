"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useStepWizard } from "../layout"
import drone_img from "../../../public/drone_img.png"

export default function Step1() {
  const [selectedTrack, setSelectedTrack] = useState("track1")
  const [trackDirection, setTrackDirection] = useState("counterclockwise")
  const [modelName, setModelName] = useState("")
  const [description, setDescription] = useState("")
  const [touched, setTouched] = useState(false)
  const { setStepCompletion, setStepData } = useStepWizard()

  useEffect(() => {
    const storedName = localStorage.getItem("modelName")
    const storedDescription = localStorage.getItem("description")

    if (storedName) setModelName(storedName)
    if (storedDescription) setDescription(storedDescription)
  }, [])

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!modelName.trim() || !description.trim()) return

    localStorage.setItem("modelName", modelName)
    localStorage.setItem("description", description)

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
        <div className="border-t border-gray-300 mx-4 mb-2" />
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="mb-3">
                <strong>DeepFlyer</strong> is an innovative reinforcement learning platform inspired by AWS DeepRacer, designed specifically for autonomous drones. Here, the <strong>agent</strong> (the drone) learns to navigate a virtual 3D space using a combination of control theory (PID) and real-time feedback from its environment.
              </p>
              <p className="mb-3">
                At the core of the system is a <strong>constant flight path</strong>—defined by an origin and a final destination point. The drone receives input in the form of its <strong>current position</strong>, <strong>propeller velocities</strong>, and <strong>orientation angle</strong>. These observations help determine whether it is on course, how far it has deviated (left or right error), and if its angle is aligned with the path.
              </p>
              <p className="mb-3">
                Using a proportional control mechanism (P in PID), the model adjusts the drone's motor speeds based on the observed error. The drone learns through repeated trials—or <strong>epochs</strong>—to minimize the deviation from the path and maintain a stable angle. The training goal is to learn an optimal <strong>policy</strong> that ensures the drone reaches its target efficiently, even under uncertain conditions like wind disturbances.
              </p>
              <p>
                The trained model can be evaluated in both <strong>Gazebo-based simulation environments</strong> and eventually deployed to real drones like the <strong>Holybro X500</strong> with PX4 for onboard communication and control.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="border rounded p-4 bg-white">
                <Image src={drone_img} alt="DeepFlyer reinforcement learning diagram" width={300} height={200} className="w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training details section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Training details</CardTitle>
          <div className="border-t mt-1" />
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="model-name">Model name</Label>
            <Input
              id="model-name"
              placeholder="MyRacer or model name"
              className="mt-1"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1">
              The model name can have up to 64 characters. Valid characters: A-Z, a-z, 0-9, and hyphen (-). No spaces or underscores (_)
            </div>
            {touched && !modelName.trim() && (
              <div className="text-xs text-red-500 mt-1">Model name is required.</div>
            )}
          </div>
          <div>
            <Label htmlFor="training-description">Training job description</Label>
            <Textarea
              id="training-description"
              placeholder="Log details for quick reference"
              className="mt-1 h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1">The model description can have up to 255 characters.</div>
            {touched && !description.trim() && (
              <div className="text-xs text-red-500 mt-1">Description is required.</div>
            )}
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
                    <Label htmlFor="track1" className="font-medium cursor-pointer">Fastest Raceway</Label>
                    <p className="text-xs text-gray-600 mt-1">
                      The Fastest Raceway is the grand finale of the DeepRacer Championship Series. Inspired by the Indy 500, this oval-shaped track features short, narrow straightaways and tight turns that test the skill and speed of your vehicle.
                    </p>the
                    <div className="text-xs text-gray-500 mt-2">Direction: Counterclockwise</div>
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <Image src="/placeholder.svg?height=100&width=200" alt="Fastest Raceway track" width={200} height={100} className="w-full" />
                </div>
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
                    <Label htmlFor="track2" className="font-medium cursor-pointer">2022 reinvent Championship</Label>
                    <p className="text-xs text-gray-600 mt-1">
                      This track was used to determine the official 2022 reinvent Championship. This international official track (15.97 m) features a technical section with hairpin turns that challenge even the most skilled developers.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">Direction: Counterclockwise</div>
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <Image src="/placeholder.svg?height=100&width=200" alt="2022 reinvent Championship track" width={200} height={100} className="w-full" />
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
                    <Label htmlFor="track3" className="font-medium cursor-pointer">Jocques Super Speedway</Label>
                    <p className="text-xs text-gray-600 mt-1">
                      This 62.07 m track is named in honor of the two best racing family and friends in the world, "Jocques" and "Timothy Takawira". These two friends have always needed to manage the technical turns while maintaining super high speeds on this drag strip to claim the championship.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">Direction: Clockwise, Counterclockwise</div>
                  </div>
                </div>
                <div className="mt-4 bg-gray-100 p-2 rounded">
                  <Image src="/placeholder.svg?height=100&width=200" alt="Jocques Super Speedway track" width={200} height={100} className="w-full" />
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <Button className="bg-[#ffd200] hover:bg-[#ec8c04] text-black" onClick={handleNext} disabled={!isValid}>
          Next
        </Button>
      </div>
    </div>
  )
}
