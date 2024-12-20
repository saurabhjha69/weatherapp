import { sequelize } from "./config.js";

export const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected Successfully!")
    } catch (error) {
        console.error("Database Got An Error",error)
    }
}