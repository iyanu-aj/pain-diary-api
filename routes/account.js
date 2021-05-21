"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.delete("/delete", authMiddleware, userController.deleteUser);

module.exports = router;
