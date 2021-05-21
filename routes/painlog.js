"use strict";
const express = require("express");
const router = express.Router();
const recordController = require("../controllers/RecordController");
const authMiddleware = require("../middleware/auth");

router.get("/graphData", authMiddleware, recordController.graphData);
router.get("/:record_id", authMiddleware, recordController.one);
router.get("/", authMiddleware, recordController.all);
router.post("/", authMiddleware, recordController.create);
router.delete("/:record_id", authMiddleware, recordController.deleteRecord);

module.exports = router;
