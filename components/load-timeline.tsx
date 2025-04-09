"use client"

import { CheckCircleIcon, CircleIcon, TruckIcon } from "lucide-react"

interface LoadTimelineProps {
  loadId: string
}

export function LoadTimeline({ loadId }: LoadTimelineProps) {
  // In a real app, you would fetch the timeline data based on the load ID
  const timelineEvents = [
    {
      id: "1",
      status: "created",
      title: "Load Created",
      description: "Load was created in the system",
      timestamp: "Apr 14, 2025 at 10:22 AM",
      completed: true,
    },
    {
      id: "2",
      status: "assigned",
      title: "Carrier Assigned",
      description: "Fast Freight LLC was assigned to this load",
      timestamp: "Apr 14, 2025 at 3:15 PM",
      completed: true,
    },
    {
      id: "3",
      status: "pickup",
      title: "Arrived at Pickup",
      description: "Driver arrived at pickup location",
      timestamp: "Apr 15, 2025 at 9:32 AM",
      completed: true,
    },
    {
      id: "4",
      status: "in_transit",
      title: "In Transit",
      description: "Load is in transit to delivery location",
      timestamp: "Apr 15, 2025 at 10:45 AM",
      completed: true,
    },
    {
      id: "5",
      status: "delivery",
      title: "Arrived at Delivery",
      description: "Driver arrived at delivery location",
      timestamp: "Expected Apr 16, 2025",
      completed: false,
    },
    {
      id: "6",
      status: "completed",
      title: "Delivery Completed",
      description: "Load was successfully delivered",
      timestamp: "Expected Apr 16, 2025",
      completed: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>

        {timelineEvents.map((event, index) => (
          <div key={event.id} className="relative mb-8 last:mb-0">
            <div className="flex items-start">
              <div className="absolute left-0 flex h-8 w-8 items-center justify-center">
                {event.completed ? (
                  <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
                ) : (
                  <CircleIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="ml-12 space-y-1">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">{event.description}</div>
                <div className="text-xs text-muted-foreground">{event.timestamp}</div>

                {event.status === "in_transit" && (
                  <div className="mt-4 rounded-lg border bg-muted/40 p-4">
                    <div className="flex items-center gap-2">
                      <TruckIcon className="h-5 w-5 text-emerald-600" />
                      <div className="font-medium">Current Location</div>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Truck is currently near Toledo, OH</p>
                      <p className="mt-1 text-muted-foreground">Last updated: Apr 15, 2025 at 2:30 PM</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[60%] rounded-full bg-emerald-600"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span>Chicago, IL</span>
                        <span>Indianapolis, IN</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
