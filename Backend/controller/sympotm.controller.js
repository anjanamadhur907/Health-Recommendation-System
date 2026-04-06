import Symptom from "../model/symptom.model.js";

export const saveSymptom = async (req,res,next)=>{
    try {
        let {symptom_name} = req.body;

        if(!symptom_name){
            return res.status(400).json({error:"symptom_name is required"});
        }

        let result = await Symptom.create({symptom_name});

        return res.status(201).json({
            message:"Symptom created successfully",
            symptom:result
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"Internal server error"})
    }
}

export const fetchSymptom = async (req,res,next)=>{
    try {
        let symptoms = await Symptom.findAll();
        return res.status(200).json(symptoms);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"Internal server error"});
    }
}