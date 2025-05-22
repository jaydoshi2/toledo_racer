  "use client"

  import type React from "react"

  import Link from "next/link"
  import { usePathname } from "next/navigation"

  export default function CreateModelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathname = usePathname()

    // Extract step number from pathname
    let currentStep = "Overview"
    if (pathname.includes("/step")) {
      const stepMatch = pathname.match(/step(\d)/)
      if (stepMatch && stepMatch[1]) {
        currentStep = `Step ${stepMatch[1]}`
      }
    }

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
          <Link href="/create_model" className="text-white hover:underline">
            Create model
          </Link>
          {pathname !== "/create_model" && (
            <>
              <div className="mx-2">{">"}</div>
              <span>{currentStep}</span>
            </>
          )}
        </header>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 min-h-screen p-4 border-r">
            <SidebarNav />
          </div>

          {/* Main content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    )
  }

  function SidebarNav() {
    const pathname = usePathname()

    const steps = [
      {
        number: 1,
        path: "/create_model/step1",
        label: "Specify the model name and environment",
      },
      {
        number: 2,
        path: "/create_model/step2",
        label: "Choose race type and training algorithm",
      },
      {
        number: 3,
        path: "/create_model/step3",
        label: "Define reward function",
      },
      {
        number: 4,
        path: "/create_model/step4",
        label: "Choose vehicle",
      },
      {
        number: 5,
        path: "/create_model/step5",
        label: "Customize reward function",
      },
    ]

    // Determine current step number from pathname
    const currentStepNumber = steps.findIndex((step) => pathname.includes(step.path)) + 1 || 0

    return (
      <div>
        {steps.map((step) => {
          // A step is active if it's the current step
          const isActive = pathname.includes(step.path)

          // A step is completed if its number is less than the current step
          const isCompleted = step.number < currentStepNumber

          return (
            <div key={step.number} className="mb-6">
              <div className="text-sm text-gray-500 flex items-center">
                {isCompleted ? (
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
                    className="text-green-500 mr-1"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <span>Step {step.number}</span>
                )}
              </div>
              <Link href={step.path}>
                <div
                  className={`font-medium ${
                    isActive ? "text-[#0073bb]" : isCompleted ? "text-green-600" : "text-gray-700"
                  } hover:text-[#0073bb] transition-colors`}
                >
                  {step.label}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
