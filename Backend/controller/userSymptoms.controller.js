import UserSymptom from "../model/userSymptoms.js";

export const addUserSymptoms = async (req, res) => {

    try {

        const { symptom_ids } = req.body;
        const user_id = req.user.userId;

        if (!user_id || !symptom_ids || symptom_ids.length === 0) {
            return res.status(400).json({ error: "user_id and symptom_ids array are required" });
        }

        const data = symptom_ids.map(symptom_id => ({
            user_id,
            symptom_id
        }));

        const result = await UserSymptom.bulkCreate(data);

        return res.status(201).json({
            message: "User symptoms saved successfully",
            result
        });

    } catch (err) {

        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }

}