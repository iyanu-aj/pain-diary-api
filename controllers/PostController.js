"use strict";
const status = require("http-status");
const {
    handleErrorResponse,
    handleSuccessResponse,
} = require("../utilities/response");
const sequelize = require("sequelize");
const Post = require("../models/Post");

const create = async (req, res, next) => {
    try {
        await Post.create({
            category: req.body.category || "",
            title: req.body.title || "",
            body: req.body.body || "",
            user_id: req.user_details.data.id,
        });

        return handleSuccessResponse({
            res,
            message: "Post created successfully",
            status_code: status.CREATED,
        });
    } catch (error) {
        next(error);
    }
};

const all = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            order: [["post_id", "DESC"]],
        });

        if (posts.length) {
            return handleSuccessResponse({
                res,
                message: "Posts found",
                status_code: status.OK,
                body: { data: posts },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Posts not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

const userPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: {
                user_id: req.user_details.data.id,
            },
            order: [["post_id", "DESC"]],
        });

        if (posts.length) {
            return handleSuccessResponse({
                res,
                message: "Posts found",
                status_code: status.OK,
                body: { data: posts },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Posts not found",
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
        const posts = await Post.findAll({
            where: {
                post_id: req.params.post_id,
            },
        });

        if (posts.length) {
            return handleSuccessResponse({
                res,
                message: "Post found",
                status_code: status.OK,
                body: { data: posts },
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Post not found",
                status_code: status.OK,
                body: { data: [] },
            });
        }
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.destroy({
            where: {
                post_id: req.params.post_id,
                user_id: req.user_details.data.id,
            },
        });

        if (post) {
            return handleSuccessResponse({
                res,
                message: "Post deleted successfully",
                status_code: status.OK,
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "Post not found. Unable to delete post",
                status_code: status.OK,
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { create, all, one, deletePost, userPosts };
