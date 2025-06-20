"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Cpu,
  Battery,
  Navigation,
  Cog,
  Wind,
  FrameIcon,
  ArrowRight,
  BookOpen,
  Target,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"

export default function DroneLearningPage() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Check if step 1 is already completed
    const completed = localStorage.getItem("STEP_1_COMPLETED")
    if (completed === "true") {
      setIsCompleted(true)
    }
  }, [])

  const handleComplete = () => {
    // Store completion in localStorage
    localStorage.setItem("STEP_1_COMPLETED", "true")
    setIsCompleted(true)
    setShowCelebration(true)

    // Hide celebration after 3 seconds
    setTimeout(() => {
      setShowCelebration(false)
    }, 3000)
  }

  const droneComponents = [
    {
      id: "frame",
      title: "Drone Frame",
      icon: <FrameIcon className="h-6 w-6" />,
      description: "The structural foundation that holds all components together",
      details:
        "The frame is the skeleton of your drone, typically made from carbon fiber, aluminum, or plastic. It determines the drone's size, weight capacity, and overall durability. Different frame designs (X, H, or + configurations) affect flight characteristics and camera mounting options.",
      keyFeatures: ["Lightweight yet strong", "Vibration dampening", "Component mounting points", "Aerodynamic design"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "propellers",
      title: "Propellers",
      icon: <Wind className="h-6 w-6" />,
      description: "Generate thrust and control directional movement",
      details:
        "Propellers convert rotational motion from motors into thrust. They come in various sizes and pitches, affecting speed, efficiency, and payload capacity. Clockwise (CW) and counter-clockwise (CCW) propellers work together to provide stable flight and yaw control.",
      keyFeatures: ["Thrust generation", "Directional control", "Various sizes and pitches", "Self-tightening design"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "flight-controller",
      title: "Flight Controller",
      icon: <Cpu className="h-6 w-6" />,
      description: "The brain that processes sensor data and controls flight",
      details:
        "The flight controller is the central processing unit that interprets pilot commands and sensor data to maintain stable flight. It runs flight control software, processes gyroscope and accelerometer data, and sends commands to ESCs to adjust motor speeds.",
      keyFeatures: [
        "Sensor data processing",
        "Flight stabilization",
        "Command interpretation",
        "Real-time calculations",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "esc",
      title: "Electronic Speed Controllers (ESCs)",
      icon: <Zap className="h-6 w-6" />,
      description: "Control motor speed and direction based on flight controller commands",
      details:
        "ESCs convert DC power from the battery into three-phase AC power for brushless motors. They receive PWM signals from the flight controller and precisely control motor speed and direction. Modern ESCs also provide telemetry data back to the flight controller.",
      keyFeatures: ["Motor speed control", "Power conversion", "Telemetry feedback", "Overcurrent protection"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "motors",
      title: "Brushless Motors",
      icon: <Cog className="h-6 w-6" />,
      description: "Convert electrical energy into rotational motion for propellers",
      details:
        "Brushless motors are highly efficient and reliable, using electromagnetic fields to create rotation. Motor specifications include KV rating (RPM per volt), which determines speed characteristics. Higher KV motors spin faster but consume more power.",
      keyFeatures: ["High efficiency", "Long lifespan", "Precise speed control", "Low maintenance"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "gps",
      title: "GPS Module",
      icon: <Navigation className="h-6 w-6" />,
      description: "Provides position data for autonomous flight and navigation",
      details:
        "GPS modules enable features like position hold, return-to-home, and waypoint navigation. They communicate with satellites to determine precise location coordinates. Some advanced modules also include compass functionality for heading reference.",
      keyFeatures: ["Position tracking", "Return-to-home", "Waypoint navigation", "Altitude reference"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "battery",
      title: "LiPo Battery",
      icon: <Battery className="h-6 w-6" />,
      description: "Powers all drone systems and determines flight time",
      details:
        "Lithium Polymer batteries provide high energy density and discharge rates needed for drone flight. Battery specifications include capacity (mAh), voltage (cell count), and discharge rate (C rating). Proper battery care is crucial for safety and longevity.",
      keyFeatures: ["High energy density", "Fast discharge capability", "Rechargeable", "Lightweight design"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003E7E]/10 via-white to-[#ffd200]/10 relative">
      {/* Confetti Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-8 text-center shadow-2xl animate-bounce">
            <CheckCircle className="h-16 w-16 text-[#ffd200] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#003E7E] mb-2">Congratulations! 🎉</h2>
            <p className="text-lg text-gray-600">You are good to go!</p>
            <div className="mt-4">
              <div className="inline-block animate-spin">🎊</div>
              <div className="inline-block animate-bounce mx-2">✨</div>
              <div className="inline-block animate-pulse">🎉</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              asChild
              className="bg-white text-[#003E7E] border-[#003E7E] hover:bg-[#003E7E] hover:text-white"
            >
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Get Back
              </Link>
            </Button>

            {isCompleted ? (
              <Badge className="bg-[#ffd200] text-[#003E7E] hover:bg-[#ffd200]/90">
                <CheckCircle className="mr-2 h-4 w-4" />
                Step 1 Completed
              </Badge>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-[#ffd200] hover:bg-[#ffd200]/90 text-[#003E7E] font-semibold"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Step 1
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-4 bg-[#ffd200]/20 text-[#003E7E] border-[#ffd200]">
            Step 1: Foundation Learning
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-[#003E7E] mb-6">Learn About Drone Components</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Begin your journey by exploring the core components of a drone—learn how each part, from the frame and
            propellers to the flight controller, ESCs, motors, GPS, and battery, contributes to stable flight and aerial
            maneuverability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#003E7E] hover:bg-[#003E7E]/90 text-white">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-[#003E7E] border-[#003E7E] hover:bg-[#003E7E] hover:text-white"
            >
              <Target className="mr-2 h-5 w-5" />
              View Components
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003E7E] mb-4">Essential Drone Components</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding each component is crucial for building, maintaining, and flying drones safely and
              effectively.
            </p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {droneComponents.map((component, index) => (
              <div key={component.id} className="group">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}>
                    {/* Image Section */}
                    <div className={`relative h-64 md:h-80 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <Image
                        src={component.image || "/placeholder.svg"}
                        alt={component.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003E7E]/20 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-[#ffd200]/20 rounded-lg text-[#003E7E]">{component.icon}</div>
                          <Badge variant="secondary" className="bg-[#003E7E]/10 text-[#003E7E]">
                            Component {index + 1}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl md:text-3xl font-bold text-[#003E7E] mb-2">
                          {component.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-[#ffd200] font-medium">
                          {component.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-0">
                        <p className="text-gray-600 mb-6 leading-relaxed">{component.details}</p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-[#003E7E]">Key Features:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {component.keyFeatures.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#ffd200] rounded-full" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>

                {index < droneComponents.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowRight className="h-6 w-6 text-[#003E7E]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 px-4 bg-[#003E7E]/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#003E7E] mb-6">Ready to Build Your Understanding?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Now that you understand the core components, you're ready to dive deeper into drone assembly, configuration,
            and flight principles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#ffd200] hover:bg-[#ffd200]/90 text-[#003E7E] font-semibold">
              Next: Assembly Guide
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-[#003E7E] border-[#003E7E] hover:bg-[#003E7E] hover:text-white"
            >
              Download Component Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
