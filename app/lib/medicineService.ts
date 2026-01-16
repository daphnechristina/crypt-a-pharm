import { doc, onSnapshot, setDoc, updateDoc, getDoc, deleteField } from "firebase/firestore"
import { db } from "./firebase"

const DEFAULT_PROGRESS = {
  factory: false,
  checkpoint1: false,
  warehouse: false,
  checkpoint2: false,
  godown: false,
  pharmacy: false,
}

export function listenToMedicine(
  medicineId: string,
  callback: (data: any) => void
) {
  const ref = doc(db, "medicines", medicineId)

  return onSnapshot(ref, async (snap) => {
    if (!snap.exists()) {
      await setDoc(ref, DEFAULT_PROGRESS)
      callback(DEFAULT_PROGRESS)
    } else {
      callback(snap.data())
    }
  })
}

export async function updateStep(medicineId: string, step: string) {
  const ref = doc(db, "medicines", medicineId)
  await updateDoc(ref, { [step]: true })
}

export async function updateCheckpointCount(
  medicineId: string,
  newCount: number
) {
  const ref = doc(db, "medicines", medicineId)
  const snap = await getDoc(ref)

  if (!snap.exists()) return

  const data = snap.data()
  const oldCount = data.checkpointCount ?? 0

  const updatePayload: any = {
    checkpointCount: newCount,
  }

  // ➕ Add new checkpoints (only if increasing)
  for (let i = oldCount + 1; i <= newCount; i++) {
    updatePayload[`checkpoint${i}`] = false
  }

  // ➖ Remove extra checkpoints (only if decreasing)
  for (let i = newCount + 1; i <= oldCount; i++) {
    updatePayload[`checkpoint${i}`] = deleteField()
  }

  await updateDoc(ref, updatePayload)
}