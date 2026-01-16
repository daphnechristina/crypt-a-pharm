"use client"

import { useState, useEffect } from "react"
import { listenToMedicine, updateStep } from "@/app/lib/medicineService"

type Step = {
  label: string
  key: string
}

export default function ProgressFlow({ medicineId }: { medicineId: string }) {
  const [steps, setSteps] = useState<Step[]>([])
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(
    {}
  )
  const [isMounted, setIsMounted] = useState(false)

  // 🔴 REAL-TIME LISTENER (Firebase)
  useEffect(() => {
    const unsubscribe = listenToMedicine(medicineId, (data) => {
      const count = Math.max(3, data?.checkpointCount ?? 3)

      let activeSteps: Step[] = []

      if (count === 3) {
        activeSteps = [
          { label: "Factory", key: "factory" },
          { label: "Warehouse", key: "warehouse" },
          { label: "Pharmacy", key: "pharmacy" },
        ]
      } else if (count === 4) {
        activeSteps = [
          { label: "Factory", key: "factory" },
          { label: "Warehouse", key: "warehouse" },
          { label: "Godown", key: "godown" },
          { label: "Pharmacy", key: "pharmacy" },
        ]
      } else if (count === 5) {
        activeSteps = [
          { label: "Factory", key: "factory" },
          { label: "Checkpoint 1", key: "checkpoint1" },
          { label: "Warehouse", key: "warehouse" },
          { label: "Checkpoint 2", key: "checkpoint2" },
          { label: "Pharmacy", key: "pharmacy" },
        ]
      } else {
        // 6 or more → full flow
        activeSteps = [
          { label: "Factory", key: "factory" },
          { label: "Checkpoint 1", key: "checkpoint1" },
          { label: "Warehouse", key: "warehouse" },
          { label: "Checkpoint 2", key: "checkpoint2" },
          { label: "Godown", key: "godown" },
          { label: "Pharmacy", key: "pharmacy" },
        ]
      }

      const mapped: Record<number, boolean> = {}
      activeSteps.forEach((step, index) => {
        mapped[index] = Boolean(data?.[step.key])
      })

      setSteps(activeSteps)
      setCompletedSteps(mapped)
      setIsMounted(true)
    })

    return () => unsubscribe()
  }, [medicineId])

  // 🔴 UPDATE BACKEND WHEN USER CLICKS
  const toggleStep = async (index: number) => {
    const stepKey = steps[index].key
    await updateStep(medicineId, stepKey)
  }

  if (!isMounted) return null

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center gap-2 z-30">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <div
            onClick={() => toggleStep(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs border border-white/30 transition-all duration-300 cursor-pointer hover:border-white/60 ${
              completedSteps[index]
                ? "bg-green-400/30 border-green-400/60 text-green-300"
                : "bg-white/10 border-white/30 text-white/60 hover:bg-white/15"
            }`}
            style={{
              filter: "url(#glass-effect)",
            }}
            title={`${
              completedSteps[index] ? "Completed" : "Incomplete"
            } - Click to toggle`}
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
                completedSteps[index]
                  ? "bg-green-400/40"
                  : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
