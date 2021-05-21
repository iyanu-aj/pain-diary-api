"use strict";
const bcryptjs = require("bcryptjs");
const status = require("http-status");
const {
    handleErrorResponse,
    handleSuccessResponse,
} = require("../utilities/response");
const { generateToken } = require("../utilities/tokenizer");

const User = require("../models/User");
const Message = require("../models/Message");
const Record = require("../models/Record");
const Post = require("../models/Post");

const register = async (req, res, next) => {
    try {
        //check if account already exists
        const doesUserExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (doesUserExist) {
            return handleErrorResponse({
                res,
                message: "User already exists",
                status_code: status.CONFLICT,
            });
        }

        // create user
        const password = await bcryptjs.hashSync(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
        });
        const token = generateToken(user);
        return handleSuccessResponse({
            res,
            message: "Account created successfully",
            status_code: status.CREATED,
            body: { token: `Bearer ${token}` },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        //check if account already exists
        const user = await User.findOne({
            where: { email: req.body.email },
        });
        if (!user) {
            return handleErrorResponse({
                res,
                message: "Unable to login. Invalid email address",
                status_code: status.NOT_FOUND,
            });
        }

        //compare passwords
        const validPassword = await bcryptjs.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return handleErrorResponse({
                res,
                status_code: status.NOT_FOUND,
                message: "Unable to login. Invalid password",
            });
        }
        const token = generateToken(user);
        return handleSuccessResponse({
            res,
            message: "Login successful",
            body: { token: `Bearer ${token}` },
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await Message.destroy({
            where: {
                user_id: req.user_details.data.id,
            },
        });
        await Post.destroy({
            where: {
                user_id: req.user_details.data.id,
            },
        });
        await Record.destroy({
            where: {
                user_id: req.user_details.data.id,
            },
        });
        const record = await User.destroy({
            where: {
                id: req.user_details.data.id,
            },
        });

        if (record) {
            return handleSuccessResponse({
                res,
                message: "User deleted successfully",
                status_code: status.OK,
            });
        } else {
            return handleSuccessResponse({
                res,
                message: "User not found. Unable to delete user",
                status_code: status.OK,
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, deleteUser };
