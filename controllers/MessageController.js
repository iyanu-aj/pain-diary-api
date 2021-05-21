"use strict";
const status = require("http-status");
const {
    handleErrorResponse,
    handleSuccessResponse,
} = require("../utilities/response");
const sequelize = require("sequelize");
const Message = require("../models/Message");
const Post = require("../models/Post");
const User = require("../models/User");

const create = async (req, res, next) => {
    try {
        await Message.create({
            message: req.body.message || "",
            posts_post_id: req.body.posts_post_id || "",
            posts_user_id: req.body.posts_user_id || "",
            user_id: req.user_details.data.id,
            time: Date.now(),
        });

        return handleSuccessResponse({
            res,
            message: "Message created successfully",
            status_code: status.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

const all = async (req, res, next) => {
    try {
        const records = await Message.findAll({
            where: {
                user_id: req.user_details.data.id,
            },
            order: [["messages_id", "DESC"]],
        });
        if (records.length) {
            let mapped = await Promise.all(
                records.map(async (record) => {
                    const post = await Post.findAll({
                        where: { post_id: record.posts_post_id },
                    });
                    const user = await User.findAll({
                        where: { id: record.posts_user_id },
                    });

                    return {
                        id: record.messages_id,
                        message: record.message,
                        post_details: {
                            title: post[0].title,
                            user: user[0].name,
                        },
                    };
                })
            );
            return handleSuccessResponse({
                res,
                message: "Messages found",
                status_code: status.OK,
                body: { data: mapped },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Messages not found",
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
        const records = await Message.findAll({
            where: {
                messages_id: req.params.message_id,
                user_id: req.user_details.data.id,
            },
        });

        if (records.length) {
            let mapped = await Promise.all(
                records.map(async (record) => {
                    const post = await Post.findAll({
                        where: { post_id: record.posts_post_id },
                    });
                    const user = await User.findAll({
                        where: { id: record.posts_user_id },
                    });

                    return {
                        id: record.messages_id,
                        message: record.message,
                        post_details: {
                            title: post[0].title,
                            user: user[0].name,
                        },
                    };
                })
            );
            return handleSuccessResponse({
                res,
                message: "Message found",
                status_code: status.OK,
                body: { data: mapped },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Message not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteMessage = async (req, res, next) => {
    try {
        const record = await Message.destroy({
            where: {
                messages_id: req.params.message_id,
                user_id: req.user_details.data.id,
            },
        });

        if (record) {
            return handleSuccessResponse({
                res,
                message: "Message deleted successfully",
                status_code: status.OK,
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Message not found. Unable to delete message",
                status_code: status.OK,
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { create, all, one, deleteMessage };
