"use strict";
const status = require("http-status");
// const sequelize = require("../connection/db");
const sequelize = require("sequelize");
const {
    handleErrorResponse,
    handleSuccessResponse,
} = require("../utilities/response");

const Record = require("../models/Record");

const create = async (req, res, next) => {
    try {
        await Record.create({
            pain_condition: req.body.pain_condition || "",
            level: req.body.level || "",
            location: req.body.location || "",
            symptoms: req.body.symptoms || "",
            description: req.body.description || "",
            triggers: req.body.triggers || "",
            medications: req.body.medications || "",
            interventions: req.body.interventions || "",
            timing: req.body.timing || "",
            environment: req.body.environment || "",
            notes: req.body.notes || "",
            user_id: req.user_details.data.id,
        });

        return handleSuccessResponse({
            res,
            message: "Pain record created successfully",
            status_code: status.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

const all = async (req, res, next) => {
    try {
        const records = await Record.findAll({
            where: {
                user_id: req.user_details.data.id,
            },
        });
        if (records.length) {
            return handleSuccessResponse({
                res,
                message: "Records found",
                status_code: status.OK,
                body: { data: records },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Records not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

const one = async (req, res, next) => {
    try {
        const records = await Record.findAll({
            where: {
                record_id: req.params.record_id,
                user_id: req.user_details.data.id,
            },
        });

        if (records.length) {
            return handleSuccessResponse({
                res,
                message: "Record found",
                status_code: status.OK,
                body: { data: records },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Record not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteRecord = async (req, res, next) => {
    try {
        const record = await Record.destroy({
            where: {
                record_id: req.params.record_id,
                user_id: req.user_details.data.id,
            },
        });

        if (record) {
            return handleSuccessResponse({
                res,
                message: "Record deleted successfully",
                status_code: status.OK,
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Record not found. Unable to delete record",
                status_code: status.OK,
            });
        }
    } catch (error) {
        next(error);
    }
};

const graphData = async (req, res, next) => {
    try {
        const records = await Record.findAll({
            where: {
                user_id: req.user_details.data.id,
            },
            attributes: [
                [sequelize.literal(`DATE(created_at)`), "x"],
                [sequelize.fn("avg", sequelize.col("level")), "y"],
            ],
            group: [sequelize.literal(`DATE(created_at)`)],
            order: [[sequelize.literal(`DATE(created_at)`), "ASC"]],
            raw: true,
        });
        if (records.length) {
            let a = records.map((record) => {
                return {
                    x: record.x,
                    y: Math.floor(record.y),
                };
            });
            return handleSuccessResponse({
                res,
                message: "Records found",
                status_code: status.OK,
                body: { data: a },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Records not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};
module.exports = { create, all, one, deleteRecord, graphData };
