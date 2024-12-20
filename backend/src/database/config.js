import { Sequelize } from "sequelize"

export const sequelize = new Sequelize('weatherapp',"postgres","saurabh",{
    host: "localhost",
    port: 5432,
    dialect: "postgres"
})
