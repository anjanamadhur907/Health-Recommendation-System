import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const Symptom = sequelize.define("symptoms",{
    symptom_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    symptom_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},{
    timestamps: false 
});

export default Symptom;
