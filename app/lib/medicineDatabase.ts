export const medicineDatabase = {
  aspirin: {
    id: "MED-001",
    name: "Aspirin",
    description:
      "Tablet. A pain reliever and anti-inflammatory medication",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  paracetamol: {
    id: "MED-002",
    name: "Paracetamol",
    description:
      "Tablet. Used to treat fever and mild to moderate pain.",
    temperature: "15–30°C",
    humidity: "40–60%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  insulin: {
    id: "MED-003",
    name: "Insulin",
    description:
      "Injection (Hormone). Used to regulate blood glucose levels in diabetic patients.",
    temperature: "2–8°C",
    humidity: "Refrigerated",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  amoxicillin: {
    id: "MED-004",
    name: "Amoxicillin",
    description:
      "Capsule / Syrup. A broad-spectrum antibiotic used to treat bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  ibuprofen: {
    id: "MED-005",
    name: "Ibuprofen",
    description:
      "Tablet. A nonsteroidal anti-inflammatory drug used to relieve pain, fever, and inflammation.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  cetirizine: {
    id: "MED-006",
    name: "Cetirizine",
    description:
      "Tablet. An antihistamine used to treat allergies.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  metformin: {
    id: "MED-007",
    name: "Metformin",
    description:
      "Tablet. An oral antidiabetic drug used to control blood sugar levels in type 2 diabetes.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  azithromycin: {
    id: "MED-008",
    name: "Azithromycin",
    description:
      "Capsule. An antibiotic used to treat respiratory, skin, and other bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  omeprazole: {
    id: "MED-009",
    name: "Omeprazole",
    description:
      "Capsule. A proton pump inhibitor used to reduce stomach acid and treat GERD and ulcers.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  salbutamol: {
    id: "MED-010",
    name: "Salbutamol",
    description:
      "Inhaler. A bronchodilator used to relieve asthma and other breathing disorders.",
    temperature: "15–30°C",
    humidity: "40–60%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  doxycycline: {
    id: "MED-011",
    name: "Doxycycline",
    description:
      "Capsule. An antibiotic used to treat a wide range of bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  morphine: {
    id: "MED-012",
    name: "Morphine",
    description:
      "Injection. A strong opioid analgesic used to manage severe pain in clinical settings.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  epinephrine: {
    id: "MED-013",
    name: "Epinephrine",
    description:
      "Injection (Hormone). Used in emergency treatment of severe allergic reactions (anaphylaxis).",
    temperature: "15–25°C",
    humidity: "Protected from light",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  covid19vaccine: {
    id: "MED-014",
    name: "COVID-19 Vaccine",
    description:
      "Injection (Vaccine). Used to provide immunity against COVID-19 infection.",
    temperature: "2–8°C",
    humidity: "Cold Chain Required",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
  vitaminb12: {
    id: "MED-015",
    name: "Vitamin B12",
    description:
      "Injection. A dietary supplement used to treat or prevent vitamin B12 deficiency.",
    temperature: "15–25°C",
    humidity: "30–50%",
    contactAddres: "0x373948600f67B1325614FF123491F5086986D6e3"
  },
} as const;

// Useful helper types
export type MedicineKey = keyof typeof medicineDatabase
export type MedicineData = (typeof medicineDatabase)[MedicineKey]

export const medicineById = Object.values(medicineDatabase).reduce(
  (acc, med) => {
    acc[med.id] = med
    return acc
  },
  {} as Record<string, typeof medicineDatabase[keyof typeof medicineDatabase]>
)
