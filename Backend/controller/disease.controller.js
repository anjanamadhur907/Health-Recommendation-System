import Disease from "../model/disease.model.js";
import Symptom from "../model/symptom.model.js";
import DiseaseSymptom from "../model/diseaseSymptom.model.js";
import Remedies from "../model/remedies.model.js";
import UserSymptom from "../model/userSymptoms.js";

export const saveDisease = async (req ,res ,next)=>{
    try {
        const {disease_name, difficulty_level, recovery_days} = req.body;
        const disease = await Disease.create({disease_name, difficulty_level, recovery_days});
        return res.status(201).json({
            message:"Disease created successfully",
            disease
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error"});
    }
};

export const getDisease = async (req,res,next)=>{
    try {
        const disease = await Disease.findAll({
            include:[{
                model:Symptom,
                through:{attributes:[]}
            },
            {
                model:Remedies
            }]
        });
        return res.status(200).json(disease);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error"});
    }
};

export const predictDisease = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if(!symptoms || symptoms.length === 0){
        return res.status(400).json({error:"Symptoms array is required"});
    }

    const symptomData = await Symptom.findAll({
      where: {
        symptom_name: symptoms
      }
    });

    if(symptomData.length === 0){
        return res.status(404).json({error:"No matching symptoms found"});
    }

    const symptomIds = symptomData.map(s => s.symptom_id);

    const diseases = await Disease.findAll({
      include: [
        {
          model: Symptom,
          through: { attributes: [] }
        },
        {
          model: Remedies,
          attributes:["home_remedy","ayurvedic_medicine","medicine"]
        }
      ]
    });

    let bestMatch = null;
    let maxScore = 0;

    for (let disease of diseases) {
      let matchCount = 0;

      for (let symptom of disease.symptoms) {
        if (symptomIds.includes(symptom.symptom_id)) {
          matchCount++;
        }
      }

      if (matchCount > maxScore) {
        maxScore = matchCount;
        bestMatch = disease;
      }
    }

    if(!bestMatch){
        return res.status(404).json({error:"No matching disease found"});
    }

    return res.status(200).json({
      message:"Disease prediction successful",
      disease: bestMatch.disease_name,
      difficulty_level: bestMatch.difficulty_level,
      recovery_days: bestMatch.recovery_days,
      match_score: maxScore,
      remedies: bestMatch.remedies
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const smartPredict = async (req, res) => {
  try {
    const { symptoms, user_id } = req.body;

    let symptomIds = [];

    if (symptoms && symptoms.length > 0) {
      const symptomData = await Symptom.findAll({
        where: {
          symptom_name: symptoms
        }
      });

      if (symptomData.length === 0) {
        return res.status(404).json({ error: "No matching symptoms found" });
      }

      symptomIds = symptomData.map(s => s.symptom_id);
    } else if (user_id) {
      const userSymptoms = await UserSymptom.findAll({
        where: { user_id }
      });

      if (!userSymptoms || userSymptoms.length === 0) {
        return res.status(404).json({ error: "No symptoms found for this user" });
      }

      symptomIds = userSymptoms.map(us => us.symptom_id);
    } else {
      return res.status(400).json({
        error: "Provide either symptoms array or user_id"
      });
    }

    const diseases = await Disease.findAll({
      include: [
        {
          model: Symptom,
          through: { attributes: [] }
        },
        {
          model: Remedies,
          attributes: ["home_remedy", "ayurvedic_medicine", "medicine"]
        }
      ]
    });

    let results = [];

    for (let disease of diseases) {
      let matchCount = 0;
      let totalSymptoms = disease.symptoms.length;

      for (let symptom of disease.symptoms) {
        if (symptomIds.includes(symptom.symptom_id)) {
          matchCount++;
        }
      }

      if (matchCount > 0) {
        let percentage = (matchCount / totalSymptoms) * 100;

        // ✅ Unwrap remedies array
        let remediesData =
          disease.remedies && disease.remedies.length > 0
            ? {
                home_remedy: disease.remedies[0].home_remedy,
                ayurvedic_medicine: disease.remedies[0].ayurvedic_medicine,
                medicine: disease.remedies[0].medicine
              }
            : { home_remedy: "", ayurvedic_medicine: "", medicine: "" };

        results.push({
          disease_name: disease.disease_name,
          difficulty_level: disease.difficulty_level,
          recovery_days: disease.recovery_days,
          match_count: matchCount,
          total_symptoms: totalSymptoms,
          match_percentage: percentage.toFixed(2),
          remedies: remediesData
        });
      }
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No disease matched" });
    }

    results.sort((a, b) => b.match_percentage - a.match_percentage);

    //Return top 3 diseases
    const topResults = results.slice(0, 3);

    return res.status(200).json({
      message: "Prediction successful",
      results: topResults
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};