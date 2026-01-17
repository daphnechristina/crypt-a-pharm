// scripts/seed-medicines.js
const fs = require("fs").promises
const path = require("path")

// Medicine database
const medicineDatabase = {
  aspirin: {
    id: "MED-001",
    name: "Aspirin",
    description: "Tablet. A pain reliever and anti-inflammatory medication",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  paracetamol: {
    id: "MED-002",
    name: "Paracetamol",
    description: "Tablet. Used to treat fever and mild to moderate pain.",
    temperature: "15–30°C",
    humidity: "40–60%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  insulin: {
    id: "MED-003",
    name: "Insulin",
    description: "Injection (Hormone). Used to regulate blood glucose levels in diabetic patients.",
    temperature: "2–8°C",
    humidity: "Refrigerated",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  amoxicillin: {
    id: "MED-004",
    name: "Amoxicillin",
    description: "Capsule / Syrup. A broad-spectrum antibiotic used to treat bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  ibuprofen: {
    id: "MED-005",
    name: "Ibuprofen",
    description: "Tablet. A nonsteroidal anti-inflammatory drug used to relieve pain, fever, and inflammation.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  cetirizine: {
    id: "MED-006",
    name: "Cetirizine",
    description: "Tablet. An antihistamine used to treat allergies.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  metformin: {
    id: "MED-007",
    name: "Metformin",
    description: "Tablet. An oral antidiabetic drug used to control blood sugar levels in type 2 diabetes.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  azithromycin: {
    id: "MED-008",
    name: "Azithromycin",
    description: "Capsule. An antibiotic used to treat respiratory, skin, and other bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  omeprazole: {
    id: "MED-009",
    name: "Omeprazole",
    description: "Capsule. A proton pump inhibitor used to reduce stomach acid and treat GERD and ulcers.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  salbutamol: {
    id: "MED-010",
    name: "Salbutamol",
    description: "Inhaler. A bronchodilator used to relieve asthma and other breathing disorders.",
    temperature: "15–30°C",
    humidity: "40–60%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  doxycycline: {
    id: "MED-011",
    name: "Doxycycline",
    description: "Capsule. An antibiotic used to treat a wide range of bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  morphine: {
    id: "MED-012",
    name: "Morphine",
    description: "Injection. A strong opioid analgesic used to manage severe pain in clinical settings.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  epinephrine: {
    id: "MED-013",
    name: "Epinephrine",
    description: "Injection (Hormone). Used in emergency treatment of severe allergic reactions (anaphylaxis).",
    temperature: "15–25°C",
    humidity: "Protected from light",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  covid19vaccine: {
    id: "MED-014",
    name: "COVID-19 Vaccine",
    description: "Injection (Vaccine). Used to provide immunity against COVID-19 infection.",
    temperature: "2–8°C",
    humidity: "Cold Chain Required",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
  vitaminb12: {
    id: "MED-015",
    name: "Vitamin B12",
    description: "Injection. A dietary supplement used to treat or prevent vitamin B12 deficiency.",
    temperature: "15–25°C",
    humidity: "30–50%",
    contactAddress: "0x373948600f67B1325614FF123491F5086986D6e3",
  },
}

async function seedMedicines() {
  try {
    const dbDir = path.join(process.cwd(), ".data")
    const medicinesFile = path.join(dbDir, "medicines.json")

    // Create .data directory if it doesn't exist
    await fs.mkdir(dbDir, { recursive: true })

    // Convert database to ID-indexed format
    const medicinesData = {}
    Object.entries(medicineDatabase).forEach(([key, medicine]) => {
      medicinesData[medicine.id] = {
        id: medicine.id,
        name: medicine.name,
        description: medicine.description,
        temperature: medicine.temperature,
        humidity: medicine.humidity,
        contactAddress: medicine.contactAddress,
      }
    })

    // Write to file
    await fs.writeFile(medicinesFile, JSON.stringify(medicinesData, null, 2))

    console.log("✅ Medicines seeded successfully!")
    console.log(`📍 Location: ${medicinesFile}`)
    console.log(`📊 Total medicines: ${Object.keys(medicinesData).length}`)
  } catch (err) {
    console.error("❌ Failed to seed medicines:", err.message)
    process.exit(1)
  }
}

seedMedicines()