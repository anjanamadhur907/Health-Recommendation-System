import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import symptomRouter from "./routes/symptom.routes.js";
import diseaseRouter from "./routes/disease.routes.js";
import remediesRouter from "./routes/remedies.routes.js";
import userSymptoms from "./routes/userSymptoms.routes.js";
import "./model/association.js";
import cors from "cors"

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/user", userRouter);
app.use("/symptom", symptomRouter);
app.use("/disease", diseaseRouter);
app.use("/remedies", remediesRouter);
app.use("/userSymptoms", userSymptoms);
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.listen(3000, ()=>{
    console.log("Server started...")
});
