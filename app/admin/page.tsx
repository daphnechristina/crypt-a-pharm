"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../lib/firebase"
import Link from "next/link"
import Image from "next/image"

const STEPS = [
  { key: "factory", label: "Factory" },
  { key: "checkpoint1", label: "Checkpoint 1" },
  { key: "warehouse", label: "Warehouse" },
  { key: "checkpoint2", label: "Checkpoint 2" },
  { key: "godown", label: "Godown" },
  { key: "pharmacy", label: "Pharmacy" },
]

export default function ModeratorDashboard() {
  const [medicines, setMedicines] = useState<any[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "medicines"), (snap) => {
      const list = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setMedicines(list)
    })

    return () => unsub()
  }, [])
  
  function getStepsForCount(count: number) {
    if (count <= 3) {
      return ["factory", "warehouse", "pharmacy"]
    }
    if (count === 4) {
      return ["factory", "warehouse", "godown", "pharmacy"]
    }
    if (count === 5) {
      return ["factory", "checkpoint1", "warehouse", "checkpoint2", "pharmacy"]
    }
    return ["factory", "checkpoint1", "warehouse", "checkpoint2", "godown", "pharmacy"]
  }


  const getCurrentStep = (med: any) => {
    const steps = getStepsForCount(med.checkpointCount || 6)

    for (let i = steps.length - 1; i >= 0; i--) {
      if (med[steps[i]]) {
        const step = STEPS.find(s => s.key === steps[i])
        return step?.label ?? "Unknown"
      }
    }
    return "Not Started"
  }


  const getCompletedCount = (med: any) => {
    const steps = getStepsForCount(med.checkpointCount || 6)
    return steps.filter(key => med[key]).length
  }


return (
  <div className="text-white">

    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-8xl font-bold mb-4 tracking-tight duration-300 hover:scale-101 hover:animate-pulse hover:text-purple-400">
        Crypt-a-Pharm
      </h1>

      <p className="max-w-xl text-white/70 text-lg mb-8">
        A blockchain-based pharmaceutical supply chain tracker ensuring
        authenticity and transparency from factory to pharmacy.
      </p>

      <div className="font-bold text-amber text-md">
       Yantra 2026, IEEE EMBS.
      </div>

      <div className="mt-4 brightness-125 hover:opacity-100 transition-opacity duration-300">
        <Image src="/embs.png" alt="IEEE EMBS Logo" width={140} height={0.5} className="mx-auto" />
      </div>
    </section>


    <section className="min-h-screen px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">
        🛡 Moderator Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {medicines.map(med => {
          const completed = getCompletedCount(med)
          const activeSteps = getStepsForCount(med.checkpointCount || 6)
          const percent = (completed / activeSteps.length) * 100
          const currentStep = getCurrentStep(med)

          return (
            <Link
              key={med.id}
              href={`/med?med=${med.id}`}
              className="block"
            >
              <div
                className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur
                           transition-all hover:bg-white/10 hover:scale-[1.02]"
              >

                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">{med.id}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      percent === 100
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {percent === 100 ? "Completed" : "In Transit"}
                  </span>
                </div>


                <p className="text-sm text-white/70 mb-2">
                  📍 Current location:
                  <span className="ml-1 font-medium text-white">
                    {currentStep}
                  </span>
                </p>


                <div className="w-full h-2 bg-white/10 rounded overflow-hidden mb-3">
                  <div
                    className="h-full bg-green-400 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>


                <div className="flex flex-wrap gap-2">
                  {getStepsForCount(med.checkpointCount || 6).map(key => {
                    const step = STEPS.find(s => s.key === key)!
                    return (
                      <span
                        key={step.key}
                        className={`text-xs px-2 py-1 rounded ${
                          med[step.key]
                            ? "bg-green-400/20 text-green-300"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {step.label}
                      </span>
                    )
                  })}
                </div>


                <p className="mt-4 text-xs text-white/50">
                  Click to view medicine details →
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  </div>
)
}
