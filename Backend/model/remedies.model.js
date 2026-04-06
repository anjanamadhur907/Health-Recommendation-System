import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const Remedies = sequelize.define("remedies", {
    remedy_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    disease_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    home_remedy: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ayurvedic_medicine: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    medicine: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    timestamps: false
});

export default Remedies;