"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronLeft, ChevronRight, Settings, ArrowUpDown } from "lucide-react"
import { useState } from "react"

interface Model {
  id: string
  name: string
  description: string
  status: string
  algorithm: string
  sensors: string
  creationTime: string
}

const mockModels: Model[] = [
  {
    id: "1",
    name: "second",
    description: "",
    status: "Ready",
    algorithm: "PPO",
    sensors: "Camera",
    creationTime: "Wed, 21 May 2025 23:38:45 GMT",
  },
  {
    id: "2",
    name: "htgh",
    description: "",
    status: "Ready",
    algorithm: "SAC",
    sensors: "Camera",
    creationTime: "Thu, 15 May 2025 19:32:13 GMT",
  },
  {
    id: "3",
    name: "firstmodel",
    description: "",
    status: "Ready",
    algorithm: "SAC",
    sensors: "Camera",
    creationTime: "Thu, 15 May 2025 19:21:08 GMT",
  },
]

export default function YourModels() {
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedModels(mockModels.map((model) => model.id))
    } else {
      setSelectedModels([])
    }
  }

  const handleSelectModel = (modelId: string, checked: boolean) => {
    if (checked) {
      setSelectedModels([...selectedModels, modelId])
    } else {
      setSelectedModels(selectedModels.filter((id) => id !== modelId))
    }
  }

  const filteredModels = mockModels.filter((model) => model.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* <header className="bg-[#232f3e] text-white p-4 flex items-center">
        <Link href="#" className="flex items-center gap-2 text-white">
          <span className="font-bold">AWS DeepRacer</span>
        </Link>
        <div className="mx-2">{">"}</div>
        <span>Your models</span>
      </header> */}

      <div className="p-6">
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Models (0/3)</h1>
          <div className="flex gap-3">
            <Button variant="outline">Import model</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Actions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Delete selected</DropdownMenuItem>
                <DropdownMenuItem>Export selected</DropdownMenuItem>
                <DropdownMenuItem>Clone selected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild className="bg-[#ff9900] hover:bg-[#ec8c04] text-black">
              <Link href="/create_model">Create model</Link>
            </Button>
          </div>
        </div>

        {/* Search and pagination */}
        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search models"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-2">{currentPage}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === 1} // Assuming only 1 page for now
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Models table */}
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={selectedModels.length === mockModels.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Description
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Algorithm
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Sensors
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Creation time
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModels.map((model) => (
                <TableRow key={model.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedModels.includes(model.id)}
                      onCheckedChange={(checked) => handleSelectModel(model.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={`/your_models/models/${model.id}`} className="text-blue-600 hover:underline">
                      {model.name}
                    </Link>
                  </TableCell>
                  <TableCell>{model.description}</TableCell>
                  <TableCell>{model.status}</TableCell>
                  <TableCell>{model.algorithm}</TableCell>
                  <TableCell>{model.sensors}</TableCell>
                  <TableCell>{model.creationTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
