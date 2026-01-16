"use client"

interface InstructionsModalProps {
  isOpen: boolean
  onClose: () => void
  medicineData: {
    medicineId: string
    location: string
    temperature: string
    humidity: string
  }
}

export default function InstructionsModal({ isOpen, onClose, medicineData }: InstructionsModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md w-full relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8 pt-10">
            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-6">Steps to Proceed:</h2>

            {/* Steps */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <p className="text-white text-sm font-light leading-relaxed">
                  • Copy contract address to "At address" on Remix (in Run Deployments) and deploy.
                </p>
              </div>

              {/* Step 2 - Log Data */}
              <div>
                <p className="text-white text-sm font-light mb-3">• Log Data in dropdown. For example:</p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-green-400 space-y-1">
                  <div>medicineId: {medicineData.medicineId}</div>
                  <div>location: {medicineData.location}</div>
                  <div>temperature: {medicineData.temperature}</div>
                  <div>humidity: {medicineData.humidity}</div>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <p className="text-white text-sm font-light leading-relaxed">• Transact and confirm with MetaMask!</p>
              </div>

              {/* Completion Message */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 mt-6">
                <p className="text-white/90 text-sm font-light leading-relaxed">
                  <span className="font-semibold">Done!</span> Wait for your teammates to all complete and check logs.
                </p>
                <p className="text-white text-sm font-light mt-3">Great job so far 🚀</p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full mt-8 px-6 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer"
            >
              Got it, let's go!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
