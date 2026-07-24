import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
} else {
  const dbName = process.env.DB_NAME || "postgres";
  const dbUser = process.env.DB_USER || "postgres";
  const dbPassword = process.env.DB_PASSWORD || "Madhur@123";
  const dbHost = process.env.DB_HOST || "aws-0-ap-southeast-1.pooler.supabase.com";
  const dbPort = parseInt(process.env.DB_PORT || "5432", 10);

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
}

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("PostgreSQL (Supabase) Database connected successfully...");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message || err);
  });

export default sequelize;