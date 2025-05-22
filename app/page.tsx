import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DeepRacerGetStarted() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#232f3e] text-white p-4 flex items-center">
        <Link href="#" className="flex items-center gap-2 text-white">
          <span className="font-bold">AWS DeepRacer</span>
        </Link>
        <div className="mx-4">|</div>
        <Link href="#" className="text-white hover:underline">
          Get started
        </Link>
      </header>

      <main className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold my-6">Get started with reinforcement learning</h1>

        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="p-4 border-b font-medium">How AWS DeepRacer works</div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Step 1: Learn basics */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Learn basics icon"
                      width={100}
                      height={100}
                      className="opacity-60"
                    />
                  </div>
                  <h3 className="font-medium text-gray-700">Learn basics</h3>
                  <p className="text-sm text-gray-600">Learn reinforcement learning basics</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                </div>

                {/* Step 2: Create model */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Create model icon"
                      width={100}
                      height={100}
                      className="opacity-60"
                    />
                  </div>
                  <h3 className="font-medium text-gray-700">Create model</h3>
                  <p className="text-sm text-gray-600">Choose action space, algorithm, and reward function</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                </div>

                {/* Step 3: Train & evaluate */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Train & evaluate icon"
                      width={100}
                      height={100}
                      className="opacity-60"
                    />
                  </div>
                  <h3 className="font-medium text-gray-700">Train & evaluate</h3>
                  <p className="text-sm text-gray-600">See your strategy in simulation and your metrics visualized</p>
                </div>
              </div>

              {/* Second row with arrows */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="hidden md:block"></div>

                {/* Step 4: Model iteration & Upskill */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Model iteration icon"
                      width={100}
                      height={100}
                      className="opacity-60"
                    />
                  </div>
                  <h3 className="font-medium text-gray-700">Model iteration & Upskill</h3>
                  <p className="text-sm text-gray-600">
                    Clone, ideate, and create a winning strategy. Attend workshops to learn advanced RL techniques
                  </p>
                </div>

                {/* Step 5: Join DeepRacer League */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Join DeepRacer League icon"
                      width={100}
                      height={100}
                      className="opacity-60"
                    />
                  </div>
                  <h3 className="font-medium text-gray-700">Join DeepRacer League</h3>
                  <p className="text-sm text-gray-600">Race models in the Virtual Circuit</p>
                </div>
              </div>

              {/* Connecting lines */}
              <div className="hidden md:block relative h-20 mt-4">
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>
                <div className="absolute right-1/4 top-0 w-0.5 h-1/2 bg-gray-200 -translate-x-1/2"></div>
                <div className="absolute right-1/4 top-1/2 w-[calc(25%-1rem)] h-0.5 bg-gray-200"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="p-4 border-b font-medium">
              Step 1: Take a crash course on Reinforcement Learning (10min)
            </div>
            <div className="p-4">
              <p className="mb-4">
                Reinforcement Learning (RL) is the Machine Learning technique which drives AWS DeepRacer. Learn the
                basics of RL to create and optimize your models to compete in the AWS DeepRacer League.
              </p>
              <Button variant="outline" className="border-gray-300 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Start the course
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b font-medium">Step 2: Create a model</div>
            <div className="p-4">
              <p className="mb-4">
                Simply follow the steps in the console to build, train and evaluate your model and enter the AWS
                DeepRacer Virtual Circuit. With <span className="text-[#0073bb]">AWS Free Tier</span>, you will receive
                10 free hours to train or evaluate models and 5GB of free storage during your first month. This is
                enough to train your first time-trial model, evaluate it, tune it, and then enter it into the AWS
                DeepRacer Virtual Circuit. This offer is valid for 30 days after you have used the service for the first
                time.
              </p>
              <Button className="bg-[#ff9900] hover:bg-[#ec8c04] text-black">
                   <Link href="/create_model">Create model</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
