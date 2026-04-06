import Remedies from "../model/remedies.model.js";
import Disease from "../model/disease.model.js";

export const addRemedies = async (req ,res ,next)=>{
    try {
        const {disease_id, home_remedy, ayurvedic_medicine,medicine} = req.body;

        if(!disease_id || !home_remedy || !ayurvedic_medicine || !medicine){
            return res.status(400).json({error:"disease_id, home_remedy, and ayurvedic_medicine are required"});
        }

        const remedy = await Remedies.create({disease_id, home_remedy, ayurvedic_medicine, medicine});

        return res.status(201).json({
            message:"Remedy created successfully",
            remedy
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error"});
    }
};

export const getRemedies = async(req,res)=>{

    try{

        const remedies = await Remedies.findAll({
            include:[{
                model:Disease,
                attributes:["disease_id","disease_name"]
            }]
        });

        return res.status(200).json(remedies)

    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"})
    }

}

export const getRemedyByDisease = async(req,res)=>{

    try{

        const {disease_id} = req.params

        const remedy = await Remedies.findAll({
            where:{disease_id},
            include:[{
                model:Disease,
                attributes:["disease_id","disease_name"]
            }]
        })

        if(!remedy || remedy.length === 0){
            return res.status(404).json({error:"No remedies found for this disease"})
        }

        return res.status(200).json(remedy)

    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Server error"})
    }

}