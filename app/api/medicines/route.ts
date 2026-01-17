// app/api/medicines/route.ts (DEBUG VERSION)
import { NextResponse } from "next/server"
import { getAllMedicines } from "@/app/lib/database"

export async function GET() {
  try {
    console.log("📚 [API] /medicines GET - Starting...")
    
    const medicines = await getAllMedicines()
    
    console.log("📚 [API] Got medicines:", medicines.length, "items")
    console.log("📚 [API] First medicine:", medicines[0])
    
    return NextResponse.json(medicines)
  } catch (err) {
    console.error("❌ [API] Failed to fetch medicines:", err)
    return NextResponse.json({ error: "Failed to fetch medicines", details: String(err) }, { status: 500 })
  }
}