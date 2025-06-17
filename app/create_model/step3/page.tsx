"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import HolyBro500_image from "../../../public/HolyBro500_image.webp"

export default function Step4() {
  const [selectedVehicle, setSelectedVehicle] = useState("original-deepracer")
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose vehicle shell and sensor configuration</h1>

      {/* Vehicle selection section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Vehicle shell with sensor configuration (1)</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search box */}
          <div className="mb-4">
            <Input type="text" placeholder="Search" className="max-w-md" />
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <span className="text-sm">{currentPage}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === 1} // Assuming only 1 page for now
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>

          {/* Vehicle options */}
          <RadioGroup value={selectedVehicle} onValueChange={setSelectedVehicle} className="grid grid-cols-1 gap-4">
            {/* The Original DeepRacer */}
            <div
              className={`border rounded-md relative cursor-pointer transition-colors ${
                selectedVehicle === "original-deepracer" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedVehicle("original-deepracer")}
            >
              <div className="p-4 pb-2">
                <div className="flex items-start">
                  <RadioGroupItem value="original-deepracer" id="original-deepracer" className="mt-1" />
                  <div className="ml-2">
                    <Label htmlFor="original-deepracer" className="font-medium cursor-pointer">
                      The Original DeepRacer
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">Sensor(s): Camera; Shell: DeepRacer</p>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Image
                  src={HolyBro500_image || "/placeholder.svg"}
                  alt="The Original DeepRacer"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
            </div>

            {/* You can add more vehicle options here if needed */}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline" asChild>
          <Link href="/create_model/step2">Previous</Link>
        </Button>
        <Button asChild className="bg-[#ffd200] hover:bg-[#ec8c04] text-black">
          <Link href="/create_model/step4">Next</Link>
        </Button>
      </div>
    </div>
  )
}
    