"use strict";
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");
const authMiddlware = require("../middleware/auth");

router.get("/:message_id", authMiddlware, messageController.one);
router.get("/", authMiddlware, messageController.all);
router.post("/", authMiddlware, messageController.create);
router.delete("/:message_id", authMiddlware, messageController.deleteMessage);

module.exports = router;
