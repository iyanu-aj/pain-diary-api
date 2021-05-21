"use strict";
const { handleFatalError } = require("./response");
const status = require("http-status");

const handleError = (err, req, res) => {
    let error_stack = err.stack;
    if (err.message === "jwt expired") {
        return handleFatalError({
            res,
            status_code: status.UNAUTHORIZED,
            error: err.errors,
            message: err.message,
            error_stack,
        });
    } else if (err.message === "invalid token") {
        return handleFatalError({
            res,
            status_code: status.UNAUTHORIZED,
            error: err.errors,
            message: err.message,
            error_stack,
        });
    } else if (err.message === "invalid signature") {
        return handleFatalError({
            res,
            status_code: status.UNAUTHORIZED,
            error: err.errors,
            message: err.message,
            error_stack,
        });
    }
    return handleFatalError({
        res,
        error: err.errors,
        message: err.message,
        error_stack,
    });
};

module.exports = handleError;
