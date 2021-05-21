"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * generates a token from the payload passed to it - joken expires 2 days after it was generated.
 * @param   {object}  payload
 * @return  {string}           [signed json web token]
 */
const generateToken = (payload) => {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48, // 2 days
            data: payload,
        },
        process.env.JSON_TOKEN
    );
};

/**
 * Verifies a JSON WEB TOKEN
 * @param   {string}  auth_token  [auth token to verify]
 * @return  {boolean}
 */
const verifyToken = (auth_token) => {
    return jwt.verify(auth_token, process.env.JSON_TOKEN);
};

module.exports = { generateToken, verifyToken };
