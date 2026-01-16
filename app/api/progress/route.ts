import { NextResponse } from "next/server"
import { getFirestore } from "firebase/firestore"
import { app } from "../../lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

const db = getFirestore(app)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const medId = searchParams.get("med")

  if (!medId) return NextResponse.json({ error: "Missing med" })

  const ref = doc(db, "progress", medId)
  const snap = await getDoc(ref)

  return NextResponse.json(
    snap.exists()
      ? snap.data()
      : { factory: false, warehouse: false, transport: false, hospital: false }
  )
}

export async function POST(req: Request) {
  const body = await req.json()
  const { medId, progress } = body

  await setDoc(doc(db, "progress", medId), progress)

  return NextResponse.json({ success: true })
}
