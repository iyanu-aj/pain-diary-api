const { DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const Post = sequelize.define(
    "Post",
    {
        post_id: { type: DataTypes.NUMBER, primaryKey: true },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "posts",
        timestamps: false,
    }
);

module.exports = Post;
