"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronLeft, ChevronRight, Settings, ArrowUpDown } from "lucide-react"
import { useState, useEffect } from "react"

interface Model {
  id: number
  drone_id: string
  title: string
  description: string
  status: "initializing" | "training" | "finished"
  training_epochs: number
  drone_details: {
    raceType: string
    algorithm: string
    flightAltitude: string
    velocityLimit: string
    yawLimit: string
    enableWind: string
    windSpeed: string
  }
  train_loss?: number
  train_accuracy?: number
  user_id: number
}

export default function YourModels() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  // Get username from localStorage or context
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') || 'defaultuser' : 'defaultuser'

  useEffect(() => {
    fetchUserModels()
  }, [])

  const fetchUserModels = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8000/users/${username}/drone-models/`)

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`)
      }
      
      const data = await response.json()
      setModels(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching models:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {models
      setSelectedModels(models.map((model) => model.drone_id))
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'initializing':
        return 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium'
      case 'training':
        return 'text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium'
      case 'finished':
        return 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium'
      case 'failed':
        return 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium'
      default:
        return 'text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  }

  const filteredModels = models.filter((model) => 
    model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-lg">Loading models...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="p-6">
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Models ({models.length}/3)</h1>
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
            <Button asChild className="bg-[#ffd200] hover:bg-[#ec8c04] text-black">
              <Link href="/create_model">Create model</Link>
            </Button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={fetchUserModels}
            >
              Retry
            </Button>
          </div>
        )}

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
              disabled={currentPage === 1}
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
                  <Checkbox 
                    checked={selectedModels.length === models.length && models.length > 0} 
                    onCheckedChange={handleSelectAll} 
                  />
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
              {filteredModels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    {models.length === 0 ? "No models found. Create your first model!" : "No models match your search."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredModels.map((model) => (
                  <TableRow key={model.drone_id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedModels.includes(model.drone_id)}
                        onCheckedChange={(checked) => handleSelectModel(model.drone_id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/your_models/${model.drone_id}`} 
                        className="text-blue-600 hover:underline"
                      >
                        {model.title}
                      </Link>
                    </TableCell>
                    <TableCell>{model.description || "-"}</TableCell>
                    <TableCell>
                      <span className={getStatusColor(model.status)}>
                        {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{model.drone_details.algorithm.toUpperCase()}</TableCell>
                    <TableCell>Camera</TableCell>
                    <TableCell>
                      {/* You'll need to add a created_at timestamp to your model */}
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
