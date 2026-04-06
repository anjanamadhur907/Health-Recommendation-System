import Disease from "./model/disease.model.js";
import Symptom from "./model/symptom.model.js";
import DiseaseSymptom from "./model/diseaseSymptom.model.js";
import Remedies from "./model/remedies.model.js";
import sequelize from "./dbConfig/dbConfig.js";

const data = [
  {
    disease: "Common Cold",
    symptoms: ["cold", "cough", "sneezing", "mild fever", "runny nose"],
    difficulty_level: "Low",
    recovery_days: "3-5 days",
    home_remedies: ["drink warm water", "ginger tea", "steam inhalation"],
    ayurvedic_medicines: ["tulsi leaves", "sitopaladi churna", "trikatu powder"],
    medicines: ["paracetamol", "cetirizine", "decongestant"]
  },
  {
    disease: "Flu",
    symptoms: ["fever", "cough", "body ache", "fatigue", "sore throat"],
    difficulty_level: "Medium",
    recovery_days: "5-7 days",
    home_remedies: ["warm soups", "rest properly", "steam inhalation"],
    ayurvedic_medicines: ["giloy kadha", "tulsi kadha", "ashwagandha"],
    medicines: ["paracetamol", "ibuprofen", "oseltamivir"]
  },
  {
    disease: "Viral Fever",
    symptoms: ["fever", "headache", "fatigue", "body pain"],
    difficulty_level: "Medium",
    recovery_days: "5-7 days",
    home_remedies: ["drink fluids", "rest", "cold compress"],
    ayurvedic_medicines: ["giloy juice", "sudarshan churna", "tulsi leaves"],
    medicines: ["paracetamol", "ibuprofen"]
  },
  {
    disease: "Migraine",
    symptoms: ["severe headache", "nausea", "sensitivity to light"],
    difficulty_level: "Medium",
    recovery_days: "1-3 days",
    home_remedies: ["rest in dark room", "cold pack on head", "drink ginger tea"],
    ayurvedic_medicines: ["brahmi", "shankhpushpi", "ashwagandha"],
    medicines: ["sumatriptan", "ibuprofen", "aspirin"]
  },
  {
    disease: "Acidity",
    symptoms: ["stomach burning", "acid reflux", "bloating"],
    difficulty_level: "Low",
    recovery_days: "1-2 days",
    home_remedies: ["drink cold milk", "avoid spicy food", "eat small meals"],
    ayurvedic_medicines: ["triphala", "amla powder", "jeera water"],
    medicines: ["pantoprazole", "ranitidine", "antacids"]
  },
  {
    disease: "Indigestion",
    symptoms: ["stomach pain", "bloating", "gas"],
    difficulty_level: "Low",
    recovery_days: "1-2 days",
    home_remedies: ["drink warm water", "eat light food", "walk after meals"],
    ayurvedic_medicines: ["hing", "ajwain", "triphala"],
    medicines: ["digene", "enzymes", "antacids"]
  },
  {
    disease: "Food Poisoning",
    symptoms: ["vomiting", "diarrhea", "stomach pain", "nausea"],
    difficulty_level: "Medium",
    recovery_days: "2-4 days",
    home_remedies: ["drink ORS", "stay hydrated", "eat bananas"],
    ayurvedic_medicines: ["kutaj churna", "bilva fruit", "ginger juice"],
    medicines: ["ORS", "ondansetron", "norfloxacin"]
  },
  {
    disease: "Dehydration",
    symptoms: ["dry mouth", "fatigue", "dizziness"],
    difficulty_level: "Low",
    recovery_days: "1-2 days",
    home_remedies: ["drink water", "drink coconut water", "eat fruits"],
    ayurvedic_medicines: ["amla juice", "jeera water", "coriander water"],
    medicines: ["ORS", "electrolyte solution"]
  },
  {
    disease: "Sore Throat",
    symptoms: ["throat pain", "difficulty swallowing", "dry throat"],
    difficulty_level: "Low",
    recovery_days: "2-3 days",
    home_remedies: ["salt water gargle", "drink warm liquids", "honey with warm water"],
    ayurvedic_medicines: ["yashtimadhu", "tulsi", "ginger"],
    medicines: ["lozenges", "paracetamol", "amoxicillin"]
  },
  {
    disease: "Allergy",
    symptoms: ["sneezing", "itching", "runny nose"],
    difficulty_level: "Low",
    recovery_days: "2-5 days",
    home_remedies: ["avoid allergens", "wash face frequently", "drink warm water"],
    ayurvedic_medicines: ["haridra", "neem", "triphala"],
    medicines: ["cetirizine", "loratadine", "antihistamines"]
  },
  {
    disease: "Constipation",
    symptoms: ["hard stool", "stomach discomfort", "bloating"],
    difficulty_level: "Low",
    recovery_days: "2-3 days",
    home_remedies: ["drink warm water", "eat fiber food", "exercise"],
    ayurvedic_medicines: ["triphala", "isabgol", "castor oil"],
    medicines: ["lactulose", "dulcolax"]
  },
  {
    disease: "Diarrhea",
    symptoms: ["loose stools", "stomach cramps", "dehydration"],
    difficulty_level: "Medium",
    recovery_days: "2-4 days",
    home_remedies: ["ORS solution", "banana", "rice water"],
    ayurvedic_medicines: ["kutaj", "bilva fruit", "nutmeg"],
    medicines: ["ORS", "loperamide", "norfloxacin"]
  },
  {
    disease: "Headache",
    symptoms: ["head pain", "pressure in head"],
    difficulty_level: "Low",
    recovery_days: "1 day",
    home_remedies: ["rest", "drink water", "cold compress"],
    ayurvedic_medicines: ["brahmi", "shankhpushpi", "peppermint oil"],
    medicines: ["paracetamol", "ibuprofen"]
  },
  {
    disease: "Fatigue",
    symptoms: ["tiredness", "low energy", "weakness"],
    difficulty_level: "Low",
    recovery_days: "2-3 days",
    home_remedies: ["proper sleep", "balanced diet", "drink water"],
    ayurvedic_medicines: ["ashwagandha", "shatavari", "amla"],
    medicines: ["multivitamins", "iron supplements"]
  },
  {
    disease: "Muscle Pain",
    symptoms: ["muscle soreness", "body stiffness"],
    difficulty_level: "Low",
    recovery_days: "2-4 days",
    home_remedies: ["rest muscles", "warm compress", "gentle stretching"],
    ayurvedic_medicines: ["mahanarayan oil", "ashwagandha", "turmeric milk"],
    medicines: ["ibuprofen", "diclofenac", "muscle relaxant"]
  },
  {
    disease: "Cough",
    symptoms: ["dry cough", "throat irritation"],
    difficulty_level: "Low",
    recovery_days: "3-5 days",
    home_remedies: ["honey with warm water", "ginger tea", "steam inhalation"],
    ayurvedic_medicines: ["tulsi", "vasaka", "sitopaladi churna"],
    medicines: ["dextromethorphan", "cough syrup"]
  },
  {
    disease: "Cold and Sinus",
    symptoms: ["blocked nose", "head pressure", "runny nose"],
    difficulty_level: "Low",
    recovery_days: "4-6 days",
    home_remedies: ["nasal saline drops", "warm compress", "drink warm liquids"],
    ayurvedic_medicines: ["nasya oil", "trikatu", "hingvastika churna"],
    medicines: ["nasal spray", "paracetamol", "antihistamines"]
  }
];

const seedDatabase = async () => {
  try {
    console.log("Syncing database models...");
    await sequelize.sync({ alter: true });
    console.log("✓ Database tables created/synced");
    console.log("Starting database seeding...");

    for (let item of data) {
      // 1. Create disease
      const [disease] = await Disease.findOrCreate({
        where: { disease_name: item.disease },
        defaults: {
          disease_name: item.disease,
          difficulty_level: item.difficulty_level,
          recovery_days: item.recovery_days
        }
      });

      console.log(`Created/Found disease: ${disease.disease_name}`);

      // 2. Handle symptoms - using findOrCreate to avoid duplicates
      for (let symptomName of item.symptoms) {
        const [symptom] = await Symptom.findOrCreate({
          where: { symptom_name: symptomName },
          defaults: { symptom_name: symptomName }
        });

        // Link disease ↔ symptom (many-to-many)
        await DiseaseSymptom.findOrCreate({
          where: {
            disease_id: disease.disease_id,
            symptom_id: symptom.symptom_id
          },
          defaults: {
            disease_id: disease.disease_id,
            symptom_id: symptom.symptom_id
          }
        });
      }

      console.log(`Linked ${item.symptoms.length} symptoms to ${disease.disease_name}`);

      // 3. Create remedies (single row per disease)
      await Remedies.findOrCreate({
        where: { disease_id: disease.disease_id },
        defaults: {
          disease_id: disease.disease_id,
          home_remedy: item.home_remedies.join(", "),
          ayurvedic_medicine: item.ayurvedic_medicines.join(", "),
          medicine: item.medicines.join(", ")
        }
      });

      console.log(`Created remedies for ${disease.disease_name}`);
    }

    console.log("✓ Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();

