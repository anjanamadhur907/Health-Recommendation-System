import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const Disease = sequelize.define("disease", {
    disease_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    disease_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    difficulty_level: {
        type: DataTypes.STRING
    },
    recovery_days: {
        type: DataTypes.STRING
    }

},{
    timestamps: false 
});

export default Disease;