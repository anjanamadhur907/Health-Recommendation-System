import Disease from "./disease.model.js";
import Remedies from "./remedies.model.js";
import User from "./user.model.js";
import Symptom from "./symptom.model.js";
import UserSymptom from "./userSymptoms.js";
import DiseaseSymptom from "./diseaseSymptom.model.js";

User.belongsToMany(Symptom,{
    through:UserSymptom,
    foreignKey:"user_id",
    otherKey:"symptom_id"
});

Symptom.belongsToMany(User,{
    through:UserSymptom,
    foreignKey:"symptom_id",
    otherKey:"user_id"
});

Disease.belongsToMany(Symptom,{
    through:DiseaseSymptom,
    foreignKey:"disease_id",
    otherKey:"symptom_id"
});

Symptom.belongsToMany(Disease,{
    through:DiseaseSymptom,
    foreignKey:"symptom_id",
    otherKey:"disease_id"
});

Disease.hasMany(Remedies,{
    foreignKey:"disease_id"
});
Remedies.belongsTo(Disease,{
    foreignKey:"disease_id"
});

