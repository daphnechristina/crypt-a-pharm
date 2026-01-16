"use client"

import { medicineById } from "@/app/lib/medicineDatabase"
import { useSearchParams } from "next/navigation"

export default function Header({
  medicineId: initialMedicineId,
}: {
  medicineId?: string
}) {
  const searchParams = useSearchParams()

  // Read MED ID from URL (preferred), else fallback
  const medicineId =
    searchParams.get("med") ?? initialMedicineId ?? "MED-001"

  const medicine = medicineById[medicineId]

  if (!medicine) return null
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      {/* Logo and Branding */}
      <div className="flex items-center gap-2">
        <div className="text-white">
          <h1 className="text-md">Contract Address</h1>
          <p className="text-xs font-bold text-white">{medicine.contactAddres}</p>
        </div>
      </div>

     
      {/*<nav className="flex items-center space-x-2">
        <a
          href="#"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Home
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Database
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          About
        </a>
      </nav>*/}

      {/* Info Button 
      <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <button
          className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
            Info
        </button>
      </div> */}
    </header>
  )
}
