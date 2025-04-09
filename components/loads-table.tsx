"use client"
import { cn } from "../lib/utils";

import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon, ChevronUpIcon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface LoadsTableProps {
  status?: string
  searchQuery?: string
}

export function LoadsTable({ status = "all", searchQuery = "" }: LoadsTableProps) {
  const { toast } = useToast()
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedLoad, setSelectedLoad] = useState(null)

  // Mock data - in a real app, this would come from an API
  const [loads, setLoads] = useState([
    {
      id: "1",
      number: "LD-000001",
      customer: "Acme Corporation",
      origin: "Chicago, IL",
      destination: "Indianapolis, IN",
      pickupDate: "2025-04-15",
      deliveryDate: "2025-04-16",
      status: "active",
      rate: 1850.0,
    },
    {
      id: "2",
      number: "LD-000002",
      customer: "Globex Industries",
      origin: "Detroit, MI",
      destination: "Cleveland, OH",
      pickupDate: "2025-04-16",
      deliveryDate: "2025-04-17",
      status: "pending",
      rate: 1250.0,
    },
    {
      id: "3",
      number: "LD-000003",
      customer: "Wayne Enterprises",
      origin: "St. Louis, MO",
      destination: "Nashville, TN",
      pickupDate: "2025-04-14",
      deliveryDate: "2025-04-15",
      status: "delivered",
      rate: 2100.0,
    },
    {
      id: "4",
      number: "LD-000004",
      customer: "Stark Industries",
      origin: "Minneapolis, MN",
      destination: "Des Moines, IA",
      pickupDate: "2025-04-17",
      deliveryDate: "2025-04-18",
      status: "active",
      rate: 1450.0,
    },
    {
      id: "5",
      number: "LD-000005",
      customer: "Umbrella Corporation",
      origin: "Kansas City, MO",
      destination: "Omaha, NE",
      pickupDate: "2025-04-18",
      deliveryDate: "2025-04-19",
      status: "pending",
      rate: 1350.0,
    },
  ])

  // Filter loads based on status and search query
  const filteredLoads = loads.filter((load) => {
    const matchesStatus = status === "all" || load.status === status
    const matchesSearch =
      searchQuery === "" ||
      load.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Sort loads
  const sortedLoads = [...filteredLoads].sort((a, b) => {
    let aValue, bValue

    switch (sortField) {
      case "number":
        aValue = a.number
        bValue = b.number
        break
      case "customer":
        aValue = a.customer
        bValue = b.customer
        break
      case "origin":
        aValue = a.origin
        bValue = b.origin
        break
      case "destination":
        aValue = a.destination
        bValue = b.destination
        break
      case "date":
        aValue = a.pickupDate
        bValue = b.pickupDate
        break
      case "rate":
        aValue = a.rate
        bValue = b.rate
        break
      default:
        aValue = a.pickupDate
        bValue = b.pickupDate
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDeleteLoad = () => {
    // In a real app, you would delete the load from the database
    setLoads(loads.filter((load) => load.id !== selectedLoad.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Load Deleted",
      description: `Load ${selectedLoad.number} has been deleted.`,
      type: "success",
    })
  }

  const handleDuplicateLoad = (load) => {
    const newLoad = {
      ...load,
      id: (Number.parseInt(loads[loads.length - 1].id) + 1).toString(),
      number: `LD-${(Number.parseInt(loads[loads.length - 1].id) + 1).toString().padStart(6, "0")}`,
      status: "pending",
    }
    setLoads([...loads, newLoad])
    toast({
      title: "Load Duplicated",
      description: `Load ${load.number} has been duplicated as ${newLoad.number}.`,
      type: "success",
    })
  }

  const renderSortIcon = (field: string) => {
    if (field !== sortField) return null

    return sortDirection === "asc" ? (
      <ChevronUpIcon className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-1 h-4 w-4" />
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Active
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border gradient-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort("number")}>
              <div className="flex items-center">Load #{renderSortIcon("number")}</div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
              <div className="flex items-center">
                Customer
                {renderSortIcon("customer")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("origin")}>
              <div className="flex items-center">
                Origin
                {renderSortIcon("origin")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("destination")}>
              <div className="flex items-center">
                Destination
                {renderSortIcon("destination")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              <div className="flex items-center">
                Pickup Date
                {renderSortIcon("date")}
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("rate")}>
              <div className="flex items-center justify-end">
                Rate
                {renderSortIcon("rate")}
              </div>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLoads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No loads found.
              </TableCell>
            </TableRow>
          ) : (
            sortedLoads.map((load) => (
              <TableRow key={load.id} className="flow-animation">
                <TableCell className="font-medium">
                  <Link href={`/loads/${load.id}`} className="text-emerald-600 hover:underline">
                    {load.number}
                  </Link>
                </TableCell>
                <TableCell>{load.customer}</TableCell>
                <TableCell>{load.origin}</TableCell>
                <TableCell>{load.destination}</TableCell>
                <TableCell>{new Date(load.pickupDate).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(load.status)}</TableCell>
                <TableCell className="text-right">${load.rate.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/loads/${load.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/loads/${load.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateLoad(load)}>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedLoad(load)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete load {selectedLoad?.number}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLoad}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
