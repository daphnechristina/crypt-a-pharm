"use client"

import { useState, useEffect } from "react"
import InstructionsModal from "./instructions-modal"
import ProgressFlow from "./progress-flow"
import { medicineById } from "@/app/lib/medicineDatabase"

// Replace Firebase with API call
export function useCheckpointInitializer(medicineId: string) {
  useEffect(() => {
    if (!medicineId) return

    const init = async () => {
      try {
        // Fetch current progress data
        const res = await fetch(`/api/progress?med=${medicineId}`)
        const data = await res.json()

        // ✅ Show popup if checkpointCount is missing or 0
        if (!data?.checkpointCount || data.checkpointCount === 0) {
          const count = Number(
            prompt("Enter number of teams (minimum 3):")
          )

          if (!count || count < 3) return

          const progressData: any = {
            checkpointCount: count,
            factory: false,
            warehouse: false,
            godown: false,
            pharmacy: false,
          }

          for (let i = 1; i <= count; i++) {
            progressData[`checkpoint${i}`] = false
          }

          // Send to API to save
          await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              medId: medicineId,
              progress: progressData,
            }),
          })
        }
      } catch (err) {
        console.error("Failed to initialize checkpoint:", err)
      }
    }

    init()
  }, [medicineId])
}

export default function HeroContent() {
  const [medicineData, setMedicineData] =
    useState<typeof medicineById[keyof typeof medicineById] | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const medId = params.get("med")

    if (medId && medicineById[medId]) {
      setMedicineData(medicineById[medId])
    } else {
      setMedicineData(medicineById["MED-001"]) // default
    }
  }, [])

  useCheckpointInitializer(medicineData?.id || "")

  if (!medicineData) return null

  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center p-8">
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2">
        <ProgressFlow medicineId={medicineData.id} />
      </div>

      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 relative"
            style={{
              filter: "url(#glass-effect)",
            }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            <span className="text-white/90 text-sm font-light relative z-10">Medicine Information Database</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl tracking-tight font-light text-white mb-2">
            <span className="font-medium italic instrument">Crypt-a-Pharm</span>
          </h1>
          <p className="text-lg text-white/70 mb-8">IEEE EMBS</p>
        </div>

        {/* Medicine Details Card */}
        <div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />

          {/* Medicine Name */}
          <h2 className="text-4xl font-bold text-white mb-6 mt-4">{medicineData.name}</h2>

          {/* Details Grid */}
          <div className="space-y-4">
            {/* Medicine ID */}
            <div className="flex items-start gap-4 pb-4 border-b border-white/10">
              <span className="text-white/60 text-sm font-light min-w-24">ID:</span>
              <span className="text-white text-sm font-light">{medicineData.id}</span>
            </div>

            {/* Description */}
            <div className="flex items-start gap-4 pb-4 border-b border-white/10">
              <span className="text-white/60 text-sm font-light min-w-24">Description:</span>
              <span className="text-white text-sm font-light leading-relaxed">{medicineData.description}</span>
            </div>

            {/* Temperature */}
            <div className="flex items-start gap-4 pb-4 border-b border-white/10">
              <span className="text-white/60 text-sm font-light min-w-24">Temperature:</span>
              <span className="text-white text-sm font-light">{medicineData.temperature}</span>
            </div>

            {/* Humidity */}
            <div className="flex items-start gap-4 pb-4">
              <span className="text-white/60 text-sm font-light min-w-24">Humidity:</span>
              <span className="text-white text-sm font-light">{medicineData.humidity}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer"
          >
            View Instructions
          </button>
        </div>

        <InstructionsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          medicineData={{
            medicineId: medicineData.id,
            location: "Factory Chennai",
            temperature: medicineData.temperature,
            humidity: medicineData.humidity,
          }}
        />
      </div>
    </main>
  )
}