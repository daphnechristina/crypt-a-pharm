// app/api/progress/route.ts
import { NextResponse } from "next/server"
import { getProgress, setProgress, updateCheckpointCount } from "@/app/lib/database"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const medId = searchParams.get("med")

  if (!medId) {
    return NextResponse.json({ error: "Missing med" }, { status: 400 })
  }

  try {
    const progress = await getProgress(medId)
    return NextResponse.json(progress)
  } catch (err) {
    console.error("Failed to fetch progress:", err)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { medId, progress } = body

    if (!medId || !progress) {
      return NextResponse.json(
        { error: "Missing medId or progress" },
        { status: 400 }
      )
    }

    // Handle checkpoint count updates
    if (progress.checkpointCount !== undefined) {
      await updateCheckpointCount(medId, progress.checkpointCount)
    }

    // Update progress
    await setProgress(medId, progress)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Failed to save progress:", err)
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
  }
}