// Medicine database with detailed information
export const medicineDatabase = {
  aspirin: {
    id: "MED-001",
    name: "Aspirin",
    description: "Tablet. A pain reliever and anti-inflammatory medication",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0xCf6443901Ad0155CdBd91326d8Ac7495166aCC44",
  },
  paracetamol: {
    id: "MED-002",
    name: "Paracetamol",
    description: "Tablet. Used to treat fever and mild to moderate pain.",
    temperature: "15–30°C",
    humidity: "40–60%",
    contactAddress: "0xa63F078efc54E5955B5fDb4389ec457AD575248f",
  },
  insulin: {
    id: "MED-003",
    name: "Insulin",
    description: "Injection (Hormone). Used to regulate blood glucose levels in diabetic patients.",
    temperature: "2–8°C",
    humidity: "Refrigerated",
    contactAddress: "0xBB59688F9F53D65CBCbc34BB21FF11444D10B059",
  },
  amoxicillin: {
    id: "MED-004",
    name: "Amoxicillin",
    description: "Capsule / Syrup. A broad-spectrum antibiotic used to treat bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x1214E420919bEf39B756d54f9E2aBaF406D4ac27",
  },
  ibuprofen: {
    id: "MED-005",
    name: "Ibuprofen",
    description: "Tablet. A nonsteroidal anti-inflammatory drug used to relieve pain, fever, and inflammation.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x1ea2A0DFA6199b9579dfe4DA116966A2073f843f",
  },
  cetirizine: {
    id: "MED-006",
    name: "Cetirizine",
    description: "Tablet. An antihistamine used to treat allergies.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x28913Fa42653c9A87C45AcBC7EEc574521d26694",
  },
  metformin: {
    id: "MED-007",
    name: "Metformin",
    description: "Tablet. An oral antidiabetic drug used to control blood sugar levels in type 2 diabetes.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0xb7b93279f3f4F91F5B99A418BA18753F28A41979",
  },
  azithromycin: {
    id: "MED-008",
    name: "Azithromycin",
    description: "Capsule. An antibiotic used to treat respiratory, skin, and other bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0xf2aa83f96d5901747c0F79c49899588f453f3179",
  },
  omeprazole: {
    id: "MED-009",
    name: "Omeprazole",
    description: "Capsule. A proton pump inhibitor used to reduce stomach acid and treat GERD and ulcers.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0x367076Ea83d186F724EdD18c497217d69a6f81ee",
  },
  salbutamol: {
    id: "MED-010",
    name: "Salbutamol",
    description: "Inhaler. A bronchodilator used to relieve asthma and other breathing disorders.",
    temperature: "15–30°C",
    humidity: "40–60%",
    contactAddress: "0xe38513ef973E91B1bB519F44a7ec18055F7E2CC2",
  },
  doxycycline: {
    id: "MED-011",
    name: "Doxycycline",
    description: "Capsule. An antibiotic used to treat a wide range of bacterial infections.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0xFAA115B1F961D4afB8BF14E14F5ADF2bb47F8202",
  },
  morphine: {
    id: "MED-012",
    name: "Morphine",
    description: "Injection. A strong opioid analgesic used to manage severe pain in clinical settings.",
    temperature: "20–25°C",
    humidity: "30–50%",
    contactAddress: "0xd560a0406E4c636064e600A0169D25D99DC1c537",
  },
  epinephrine: {
    id: "MED-013",
    name: "Epinephrine",
    description: "Injection (Hormone). Used in emergency treatment of severe allergic reactions (anaphylaxis).",
    temperature: "15–25°C",
    humidity: "Protected from light",
    contactAddress: "0x94E8745e481d9Df4cA114efB10a8f011b20b79cE",
  },
  covid19vaccine: {
    id: "MED-014",
    name: "COVID-19 Vaccine",
    description: "Injection (Vaccine). Used to provide immunity against COVID-19 infection.",
    temperature: "2–8°C",
    humidity: "Cold Chain Required",
    contactAddress: "0x81d9C836A7a067350D899892D273De5Bee1550D8",
  },
  vitaminb12: {
    id: "MED-015",
    name: "Vitamin B12",
    description: "Injection. A dietary supplement used to treat or prevent vitamin B12 deficiency.",
    temperature: "15–25°C",
    humidity: "30–50%",
    contactAddress: "0x4bd1CC91329A6b0c9edC31E7d5E691e9d72bDaE4",
  },
} as const

// Type helpers
export type MedicineKey = keyof typeof medicineDatabase
export type MedicineData = (typeof medicineDatabase)[MedicineKey]

// Create a map by ID for easy lookup (used by components)
export const medicineById = Object.values(medicineDatabase).reduce(
  (acc, med) => {
    acc[med.id] = med
    return acc
  },
  {} as Record<string, typeof medicineDatabase[keyof typeof medicineDatabase]>
)