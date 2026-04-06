import { Sequelize } from "sequelize";
const sequelize = new Sequelize("health_system_db", "root", "Madhur@123",{
    host:"localhost",
    dialect:"mysql"
});

sequelize.sync({alter:true})
.then(()=>{
    console.log("database connected...")
}).catch(err=>{
    console.log(err+"connection failed...")
});

export default sequelize;