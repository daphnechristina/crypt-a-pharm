// components/checkpoint-init-modal.tsx
"use client"

import { useState } from "react"

interface CheckpointInitModalProps {
  isOpen: boolean
  medicineId: string
  onConfirm: (count: number) => void
}

export default function CheckpointInitModal({
  isOpen,
  medicineId,
  onConfirm,
}: CheckpointInitModalProps) {
  const [count, setCount] = useState<string>("3")
  const [error, setError] = useState<string>("")

  const handleSubmit = () => {
    const num = parseInt(count)

    if (isNaN(num) || num < 3 || num > 6) {
      setError("Please enter a number between 3 and 6")
      return
    }

    onConfirm(num)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-md max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-2">Setup Checkpoints</h2>
        <p className="text-white/70 mb-6">
          How many checkpoints will this medicine pass through? (3-6)
        </p>

        <div className="space-y-4">
          {/* Preset buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setCount(String(num))
                  setError("")
                }}
                className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                  count === String(num)
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Manual input */}
          <div>
            <label className="text-white/70 text-sm block mb-2">Or enter manually:</label>
            <input
              type="number"
              min="3"
              max="6"
              value={count}
              onChange={(e) => {
                setCount(e.target.value)
                setError("")
              }}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
              placeholder="Enter number"
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Description of checkpoints */}
          <div className="bg-white/5 rounded-lg p-3 text-xs text-white/60">
            <p className="font-semibold text-white/80 mb-2">Checkpoint breakdown:</p>
            <p>• <strong>3 checkpoints:</strong> Factory → Warehouse → Pharmacy</p>
            <p>• <strong>4 checkpoints:</strong> Factory → Warehouse → Godown → Pharmacy</p>
            <p>• <strong>5 checkpoints:</strong> Factory → Checkpoint 1 → Warehouse → Checkpoint 2 → Pharmacy</p>
            <p>• <strong>6 checkpoints:</strong> Factory → Checkpoint 1 → Warehouse → Checkpoint 2 → Godown → Pharmacy</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}