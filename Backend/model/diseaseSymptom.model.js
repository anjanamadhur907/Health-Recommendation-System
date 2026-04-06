import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const DiseaseSymptom = sequelize.define("disease_symptoms",{
    
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    disease_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    symptom_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    timestamps: false 
});

export default DiseaseSymptom;
