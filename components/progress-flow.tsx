"use client"

import { useState, useEffect, useCallback } from "react"

type Step = {
  key: string
  label: string
}

interface ProgressFlowProps {
  medicineId: string
  checkpointCount: number
}

export default function ProgressFlow({ medicineId, checkpointCount }: ProgressFlowProps) {
  const [steps, setSteps] = useState<Step[]>([])
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({})
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Build step list based on checkpoint count
  const buildSteps = useCallback((count: number): Step[] => {
    const count_normalized = Math.max(3, count || 3)

    if (count_normalized === 3) {
      return [
        { key: "factory", label: "Factory" },
        { key: "warehouse", label: "Warehouse" },
        { key: "pharmacy", label: "Pharmacy" },
      ]
    } else if (count_normalized === 4) {
      return [
        { key: "factory", label: "Factory" },
        { key: "warehouse", label: "Warehouse" },
        { key: "godown", label: "Godown" },
        { key: "pharmacy", label: "Pharmacy" },
      ]
    } else if (count_normalized === 5) {
      return [
        { key: "factory", label: "Factory" },
        { key: "checkpoint1", label: "Checkpoint 1" },
        { key: "warehouse", label: "Warehouse" },
        { key: "checkpoint2", label: "Checkpoint 2" },
        { key: "pharmacy", label: "Pharmacy" },
      ]
    } else {
      return [
        { key: "factory", label: "Factory" },
        { key: "checkpoint1", label: "Checkpoint 1" },
        { key: "warehouse", label: "Warehouse" },
        { key: "checkpoint2", label: "Checkpoint 2" },
        { key: "godown", label: "Godown" },
        { key: "pharmacy", label: "Pharmacy" },
      ]
    }
  }, [])

  const fetchProgress = useCallback(async () => {
    if (!medicineId) return

    try {
      const res = await fetch(`/api/progress?med=${medicineId}`, {
        cache: "no-store",
      })

      if (!res.ok) {
        console.error("Failed to fetch progress:", res.status)
        return
      }

      const data = await res.json()
      if (!data) return

      // Use the checkpointCount passed as prop, not from API response
      const activeSteps = buildSteps(checkpointCount)

      const mapped: Record<number, boolean> = {}
      activeSteps.forEach((step, i) => {
        mapped[i] = Boolean(data[step.key])
      })

      setSteps(activeSteps)
      setCompletedSteps(mapped)
      setIsMounted(true)
    } catch (err) {
      console.error("Failed to fetch progress:", err)
    }
  }, [medicineId, checkpointCount, buildSteps])

  // Poll every 2 seconds
  useEffect(() => {
    fetchProgress()
    const interval = setInterval(fetchProgress, 2000)
    return () => clearInterval(interval)
  }, [fetchProgress])

  // Mark step as complete
  const toggleStep = async (index: number) => {
    if (isLoading) return

    const stepKey = steps[index].key

    // Only allow marking next sequential step
    if (index > 0 && !completedSteps[index - 1]) {
      alert("Complete previous steps first")
      return
    }

    // Don't allow unmarking
    if (completedSteps[index]) {
      alert("Cannot undo completed steps")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medId: medicineId,
          progress: { [stepKey]: true },
        }),
      })

      if (!res.ok) {
        console.error("Failed to update progress:", res.status)
        return
      }

      // Refresh after update
      await fetchProgress()
    } catch (err) {
      console.error("Failed to toggle step:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center gap-2 z-30">
      {steps.map((step, index) => (
        <div key={step.key} className="flex flex-col items-center gap-1">
          <div
            onClick={() => toggleStep(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs border transition-all duration-300 ${
              completedSteps[index]
                ? "bg-green-400/30 border-green-400/60 text-green-300 cursor-not-allowed"
                : "bg-white/10 border-white/30 text-white/60 cursor-pointer hover:bg-white/15 hover:border-white/60"
            }`}
            style={{ filter: "url(#glass-effect)" }}
            title={
              completedSteps[index]
                ? "Completed"
                : index > 0 && !completedSteps[index - 1]
                  ? "Complete previous step first"
                  : "Click to mark complete"
            }
          >
            {completedSteps[index] ? "✓" : index + 1}
          </div>

          <span
            className={`text-[10px] font-light text-center w-max transition-all duration-300 ${
              completedSteps[index] ? "text-green-300" : "text-white/40"
            }`}
          >
            {step.label}
          </span>

          {index < steps.length - 1 && (
            <div
              className={`w-0.5 h-6 transition-all duration-300 ${
                completedSteps[index] ? "bg-green-400/40" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}