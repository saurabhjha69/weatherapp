import { DataTypes } from "sequelize";
import { sequelize } from "../database/config.js";
import { User } from "./user.js";

export const SearchHistory = sequelize.define(
  'SearchHistory',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    searchData: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    timestamps: true
  }
);

// SearchHistory.belongsTo(User);

const syncSearchHistoryToDB = async () => {
  try {
    await SearchHistory.sync({ alter: true }); // Use `alter: true` for schema changes
  } catch (error) {
    console.error("Failed to sync SearchHistory table:", error);
  }
};

syncSearchHistoryToDB();