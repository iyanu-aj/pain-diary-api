const { DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const Record = sequelize.define(
    "Record",
    {
        record_id: { type: DataTypes.NUMBER, primaryKey: true },
        pain_condition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        symptoms: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        triggers: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        medications: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        interventions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timing: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        environment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
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
        tableName: "record",
        timestamps: false,
    }
);

module.exports = Record;
