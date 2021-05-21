const { DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const Message = sequelize.define(
    "Message",
    {
        messages_id: { type: DataTypes.NUMBER, primaryKey: true },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        posts_post_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        posts_user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "messages",
        timestamps: false,
    }
);

module.exports = Message;
