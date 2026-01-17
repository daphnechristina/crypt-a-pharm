// app/lib/database.ts (DETAILED DEBUG)
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("🔌 [DB] Supabase URL:", supabaseUrl)
console.log("🔌 [DB] Supabase Key:", supabaseAnonKey ? "SET" : "MISSING")

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables in .env.local")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
console.log("✅ [DB] Supabase client created")

// Get all medicines with their progress
export async function getAllMedicines() {
  try {
    console.log("📚 [DB] getAllMedicines() called")
    
    const { data: medicines, error: medError, status } = await supabase
      .from("medicines")
      .select("*")

    console.log("🔍 [DB] Query result status:", status)
    console.log("🔍 [DB] medicines data:", medicines)
    console.log("🔍 [DB] medicines error:", medError)

    if (medError) {
      console.error("❌ [DB] Supabase error:", medError.message, medError.code)
      return []
    }

    if (!medicines) {
      console.warn("⚠️ [DB] medicines is null/undefined")
      return []
    }

    console.log(`✅ [DB] Got ${medicines.length} medicines`)

    if (medicines.length === 0) {
      console.warn("⚠️ [DB] No medicines found in table!")
      return []
    }

    // Get all progress records
    const { data: progressRecords, error: progError } = await supabase
      .from("progress")
      .select("*")

    console.log(`✅ [DB] Got ${progressRecords?.length || 0} progress records`)

    if (progError) {
      console.error("❌ [DB] Progress query error:", progError)
    }

    const progressMap = new Map()
    if (progressRecords) {
      progressRecords.forEach((prog) => {
        progressMap.set(prog.med_id, prog)
      })
    }

    // Combine medicines with progress
    const result = medicines.map((med) => {
      const progress = progressMap.get(med.id) || {
        checkpoint_count: 0,
        factory: false,
        checkpoint1: false,
        warehouse: false,
        checkpoint2: false,
        godown: false,
        pharmacy: false,
      }
      return {
        ...med,
        ...progress,
      }
    })

    console.log(`✅ [DB] Returning ${result.length} combined records`)
    return result
  } catch (err) {
    console.error("❌ [DB] getAllMedicines exception:", err)
    return []
  }
}

// Get a single medicine with its progress data
export async function getMedicine(medicineId: string) {
  const { data: medicine, error: medError } = await supabase
    .from("medicines")
    .select("*")
    .eq("id", medicineId)
    .single()

  if (medError || !medicine) {
    return null
  }

  const { data: progress, error: progError } = await supabase
    .from("progress")
    .select("*")
    .eq("med_id", medicineId)
    .single()

  if (progError) {
    return {
      ...medicine,
      checkpoint_count: 0,
      factory: false,
      checkpoint1: false,
      warehouse: false,
      checkpoint2: false,
      godown: false,
      pharmacy: false,
    }
  }

  return {
    ...medicine,
    ...progress,
  }
}

// Update a specific step for a medicine
export async function updateStep(medicineId: string, step: string) {
  const { data: existing } = await supabase
    .from("progress")
    .select("id")
    .eq("med_id", medicineId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from("progress")
      .update({ [step]: true, updated_at: new Date().toISOString() })
      .eq("med_id", medicineId)

    if (error) throw error
  } else {
    const update: any = {
      med_id: medicineId,
      [step]: true,
    }
    const { error } = await supabase
      .from("progress")
      .insert([update])

    if (error) throw error
  }
}

// Update checkpoint count and initialize new fields
export async function updateCheckpointCount(medicineId: string, newCount: number) {
  const { data: existing } = await supabase
    .from("progress")
    .select("*")
    .eq("med_id", medicineId)
    .single()

  const update: any = {
    med_id: medicineId,
    checkpoint_count: newCount,
  }

  for (let i = 1; i <= newCount; i++) {
    update[`checkpoint${i}`] = false
  }

  if (existing) {
    const { error } = await supabase
      .from("progress")
      .update(update)
      .eq("med_id", medicineId)

    if (error) throw error
  } else {
    const { error } = await supabase
      .from("progress")
      .insert([update])

    if (error) throw error
  }
}

// Set progress data for a medicine
export async function setProgress(medicineId: string, progressData: Record<string, any>) {
  const { data: existing } = await supabase
    .from("progress")
    .select("*")
    .eq("med_id", medicineId)
    .single()

  const update = {
    med_id: medicineId,
    ...progressData,
    updated_at: new Date().toISOString(),
  }

  if (existing) {
    const { error } = await supabase
      .from("progress")
      .update(update)
      .eq("med_id", medicineId)

    if (error) throw error
  } else {
    const { error } = await supabase
      .from("progress")
      .insert([update])

    if (error) throw error
  }
}

// Get progress for a single medicine
export async function getProgress(medicineId: string) {
  const { data: progress, error } = await supabase
    .from("progress")
    .select("*")
    .eq("med_id", medicineId)
    .single()

  if (error || !progress) {
    return {
      checkpoint_count: 0,
      factory: false,
      checkpoint1: false,
      warehouse: false,
      checkpoint2: false,
      godown: false,
      pharmacy: false,
    }
  }

  return progress
}