import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const UserSymptom = sequelize.define("user_symptoms",{
    
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
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

export default UserSymptom;