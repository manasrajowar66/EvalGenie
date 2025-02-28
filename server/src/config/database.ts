require("dotenv").config();
import { Sequelize } from "sequelize";
// import setupAssociations from "../models/associations";

const PG_URI = process.env.PG_URI as string;

export const sequelize = new Sequelize(PG_URI, {
    dialect: "postgres",
    logging: false, // Set to true if you want SQL logs in the console
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL Connected!");

        // Call setupAssociations *after* the database is authenticated
        // setupAssociations();

        // // Sync models (optional, only if needed)
        // await sequelize.sync({ alter: true }); 
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
