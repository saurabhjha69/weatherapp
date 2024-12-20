import {  DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';

export const User = sequelize.define(
    'User',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            index: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: true
    }
)

const syncUserToDB = async () => {
    try {
        
        await User.sync()
    } catch (error) {
        console.log("Failed to crate User Table!")
    }
}
syncUserToDB()

