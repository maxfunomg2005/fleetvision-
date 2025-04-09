"use client"
import { cn } from "../lib/utils";
import { useState, useEffect } from "react"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, TruckIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  const [activeLoads, setActiveLoads] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [margin, setMargin] = useState(0)
  const [pendingDeliveries, setPendingDeliveries] = useState(0)

  // Animate the stats on load
  useEffect(() => {
    const targetActiveLoads = 24
    const targetRevenue = 45231.89
    const targetMargin = 18.2
    const targetPendingDeliveries = 12

    const duration = 1500
    const frameRate = 1000 / 60
    const frames = duration / frameRate

    let frame = 0

    const interval = setInterval(() => {
      frame++

      const progress = frame / frames
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)

      setActiveLoads(Math.floor(targetActiveLoads * easeOutProgress))
      setRevenue(Math.floor(targetRevenue * easeOutProgress))
      setMargin(Number.parseFloat((targetMargin * easeOutProgress).toFixed(1)))
      setPendingDeliveries(Math.floor(targetPendingDeliveries * easeOutProgress))

      if (frame === frames) {
        clearInterval(interval)
        setActiveLoads(targetActiveLoads)
        setRevenue(targetRevenue)
        setMargin(targetMargin)
        setPendingDeliveries(targetPendingDeliveries)
      }
    }, frameRate)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <Card className="gradient-border-glow neon-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
          <TruckIcon className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeLoads}</div>
          <p className="text-xs text-muted-foreground">+5 from last week</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[65%] rounded-full bg-emerald-600"></div>
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-border-glow neon-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue (MTD)</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-emerald-600"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${revenue.toFixed(2)}</div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-600">
              <ArrowUpIcon className="h-3 w-3" />
              12.5%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card className="gradient-border-glow neon-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-emerald-600"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{margin}%</div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="flex items-center text-red-600">
              <ArrowDownIcon className="h-3 w-3" />
              2.1%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>

      <Card className="gradient-border-glow neon-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-emerald-600"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingDeliveries}</div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-600">
              <ArrowRightIcon className="h-3 w-3" />
              On schedule
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
