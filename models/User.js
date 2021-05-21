const { DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const User = sequelize.define(
    "User",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "user",
        timestamps: false,
    }
);

module.exports = User;
