"use client"
import { cn } from "../lib/utils";

import { useEffect, useRef } from "react"

interface LoadMapProps {
  pickup: string
  delivery: string
}

export function LoadMap({ pickup, delivery }: LoadMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, you would use a mapping API like Google Maps or Mapbox
    // For this demo, we'll just render a placeholder map
    if (mapRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = mapRef.current.clientWidth
      canvas.height = mapRef.current.clientHeight
      mapRef.current.innerHTML = ""
      mapRef.current.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw a simple map placeholder
        ctx.fillStyle = "#f0f9f0"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw a route line
        ctx.beginPath()
        ctx.moveTo(canvas.width * 0.2, canvas.height * 0.5)
        ctx.bezierCurveTo(
          canvas.width * 0.4,
          canvas.height * 0.3,
          canvas.width * 0.6,
          canvas.height * 0.7,
          canvas.width * 0.8,
          canvas.height * 0.5,
        )
        ctx.strokeStyle = "#059669"
        ctx.lineWidth = 3
        ctx.stroke()

        // Draw origin point
        ctx.beginPath()
        ctx.arc(canvas.width * 0.2, canvas.height * 0.5, 8, 0, Math.PI * 2)
        ctx.fillStyle = "#059669"
        ctx.fill()

        // Draw destination point
        ctx.beginPath()
        ctx.arc(canvas.width * 0.8, canvas.height * 0.5, 8, 0, Math.PI * 2)
        ctx.fillStyle = "#059669"
        ctx.fill()

        // Add labels
        ctx.fillStyle = "#000"
        ctx.font = "12px sans-serif"
        ctx.fillText("Origin", canvas.width * 0.2 - 20, canvas.height * 0.5 - 15)
        ctx.fillText("Destination", canvas.width * 0.8 - 30, canvas.height * 0.5 - 15)
      }
    }
  }, [pickup, delivery])

  return (
    <div ref={mapRef} className="h-full w-full rounded-md bg-muted">
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading map...</div>
    </div>
  )
}
