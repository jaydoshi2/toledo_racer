import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CreateModel() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#232f3e] text-white p-4 flex items-center">
        <Link href="#" className="flex items-center gap-2 text-white">
          <span className="font-bold">AWS DeepRacer</span>
        </Link>
        <div className="mx-2">{">"}</div>
        <Link href="#" className="text-white hover:underline">
          Your models
        </Link>
        <div className="mx-2">{">"}</div>
        <span>Create model</span>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 min-h-screen p-4 border-r">
          <div className="mb-6">
            <div className="text-sm text-gray-500">Step 1</div>
            <div className="font-medium text-[#0073bb]">Specify the model name and environment</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500">Step 2</div>
            <div className="text-gray-700">Choose race type and training algorithm</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500">Step 3</div>
            <div className="text-gray-700">Define reward function</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500">Step 4</div>
            <div className="text-gray-700">Choose vehicle</div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500">Step 5</div>
            <div className="text-gray-700">Customize reward function</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Create model</h1>

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
                    The model training process will simulate multiple experiences of the vehicle on the track in an
                    attempt to find a <strong>policy</strong> (a function mapping the agent's current state to a driving
                    decision) which maximizes the average total reward the agent experiences.
                  </p>
                  <p>
                    After training, you will be able to evaluate the model's performance in a new environment, deploy
                    the model to a physical vehicle, or submit the model to a virtual race.
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
                <Input id="model-name" placeholder="MyRacer or model name" className="mt-1" />
                <div className="text-xs text-gray-500 mt-1">
                  The model name can have up to 64 characters. Valid characters: A-Z, a-z, 0-9, and hyphen (-). No
                  spaces or underscores (_)
                </div>
              </div>

              <div>
                <Label htmlFor="training-description">Training job description - optional</Label>
                <Textarea
                  id="training-description"
                  placeholder="Log details for quick reference"
                  className="mt-1 h-24"
                />
                <div className="text-xs text-gray-500 mt-1">The model description can have up to 255 characters.</div>
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

              <RadioGroup defaultValue="track1" className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Track 1 */}
                  <div className={`border rounded-md p-4 relative border-blue-500 bg-blue-50`}>
                    <div className="flex items-start mb-2">
                      <RadioGroupItem value="track1" id="track1" className="mt-1" />
                      <div className="ml-2">
                        <Label htmlFor="track1" className="font-medium">
                          Fastest Raceway
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          The Fastest Raceway is the grand finale of the DeepRacer Championship Series. Inspired by the
                          Indy 500, this oval-shaped track features short, narrow straightaways and tight turns that
                          test the skill and speed of your vehicle. Bring all your skills to this race, as it is the
                          last and most important race of the ultimate AWS DeepRacer Championship.
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
                  <div className="border rounded-md p-4 relative">
                    <div className="flex items-start mb-2">
                      <RadioGroupItem value="track2" id="track2" className="mt-1" />
                      <div className="ml-2">
                        <Label htmlFor="track2" className="font-medium">
                          2022 reinvent Championship
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          This track was used to determine the official 2022 reinvent Championship. This international
                          official track (15.97 m) features a technical section with hairpin turns that challenge even
                          the most skilled developers.
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
                  <div className="border rounded-md p-4 relative">
                    <div className="flex items-start mb-2">
                      <RadioGroupItem value="track3" id="track3" className="mt-1" />
                      <div className="ml-2">
                        <Label htmlFor="track3" className="font-medium">
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
                <RadioGroup defaultValue="counterclockwise" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="counterclockwise" id="counterclockwise" />
                    <Label htmlFor="counterclockwise">Counterclockwise</Label>
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
            <Button variant="outline">Cancel</Button>
            <Button asChild className="bg-[#ff9900] hover:bg-[#ec8c04] text-black">
              <Link href="/create_model/step_2">Next</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
