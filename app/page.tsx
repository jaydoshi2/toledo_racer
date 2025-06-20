import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DeepRacerGetStarted() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#003E7E] text-white p-4 flex items-center">
        <Link href="#" className="flex items-center gap-2 text-white">
          <span className="font-bold">Deep Fly</span>
        </Link>
        <div className="mx-4">|</div>
        <Link href="#" className="text-white hover:underline">
          Get started
        </Link>
      </header>

      <main className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold my-6">Get started with reinforcement learning with Drone</h1>

       

        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="p-4 border-b font-medium">
              Step 1: Learn about the drone and its components
            </div>
            <div className="p-4">
              <p className="mb-4">
 Begin your journey by exploring the core components of a drone—learn how each part, from the frame and propellers to the flight controller, ESCs, motors, GPS, and battery, contributes to stable flight and aerial maneuverability
              </p>
              <Button variant="outline" className="border-gray-300 flex items-center gap-2">
                {/* <svg
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
                > */}
                  {/* <polygon points="5 3 19 12 5 21 5 3" /> */}
                {/* </svg> */}
                Take a look
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
              <Button className="bg-[#ffd200] hover:bg-[#ec8c04] text-black">
                   <Link href="/username">Create model</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
